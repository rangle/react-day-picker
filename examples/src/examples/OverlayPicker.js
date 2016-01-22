import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Overlay } from "react-overlays";
import DayPicker, { DateUtils } from "react-day-picker";

import "react-day-picker/lib/style.css";

export default class OverlayPicker extends React.Component {

  state = {
    showOverlay: false,
    value: moment().format("L"),
    month: new Date()
  }

  handleInputChange(e) {
    const { value } = e.target;
    if (moment(value, "L", true).isValid()) {
      this.setState({
        month: moment(value, "L").toDate(),
        value
      }, this.showCurrentDate);
    }
    else {
      this.setState({ value }, this.showCurrentDate);
    }
  }

  handleInputFocus() {
    this.setState({ showOverlay: true }, () => {
      this.refs.daypicker.showMonth(this.state.month);
    });
  }

  handleInputBlur() {
    // this.setState({ showOverlay: false });
  }

  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format("L"),
      month: day
    });
  }

  render() {
    const { value, month, showOverlay } = this.state;
    const selectedDay = moment(value, "L", true).toDate();
    console.log("showOverlay", showOverlay);
    return (
      <div style={ {position: "relative"}}>
        <input
          ref="input"
          type="text"
          value={ value }
          placeholder="YYYY-MM-DD"
          onChange={ this.handleInputChange.bind(this) }
          onFocus={ this.handleInputFocus.bind(this) }
          onBlur={ this.handleInputBlur.bind(this) }
        />
        <Overlay
          show={ showOverlay }
          onHide={() => this.setState({ showOverlay: false })}
          container={ this }
          position="left"
          target={ () => ReactDOM.findDOMNode(this.refs.input) }>
            <DayPicker
              ref="daypicker"
              initialMonth={ month }
              modifiers={{
                selected: day => DateUtils.isSameDay(selectedDay, day)
              }}
              onDayClick={ this.handleDayClick.bind(this) }
            />
          </Overlay>
      </div>
    );
  }

}
