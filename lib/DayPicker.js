"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Helpers = require("./Helpers");

var Helpers = _interopRequireWildcard(_Helpers);

var _DateUtils = require("./DateUtils");

var DateUtils = _interopRequireWildcard(_DateUtils);

var _LocaleUtils = require("./LocaleUtils");

var LocaleUtils = _interopRequireWildcard(_LocaleUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keys = {
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  SPACE: 32
};

var Caption = function (_Component) {
  _inherits(Caption, _Component);

  function Caption() {
    _classCallCheck(this, Caption);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Caption).apply(this, arguments));
  }

  _createClass(Caption, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var date = _props.date;
      var locale = _props.locale;
      var localeUtils = _props.localeUtils;
      var onClick = _props.onClick;

      return _react2.default.createElement(
        "div",
        { className: "DayPicker-Caption", onClick: onClick },
        localeUtils.formatMonthTitle(date, locale)
      );
    }
  }]);

  return Caption;
}(_react.Component);

var DayPicker = function (_Component2) {
  _inherits(DayPicker, _Component2);

  function DayPicker(props) {
    _classCallCheck(this, DayPicker);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DayPicker).call(this, props));

    _this2.state = {
      currentMonth: Helpers.startOfMonth(props.initialMonth)
    };
    return _this2;
  }

  _createClass(DayPicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.initialMonth !== nextProps.initialMonth) {
        this.setState({
          currentMonth: Helpers.startOfMonth(nextProps.initialMonth)
        });
      }
    }
  }, {
    key: "allowPreviousMonth",
    value: function allowPreviousMonth() {
      var fromMonth = this.props.fromMonth;

      if (!fromMonth) {
        return true;
      }
      var currentMonth = this.state.currentMonth;

      return Helpers.getMonthsDiff(currentMonth, fromMonth) < 0;
    }
  }, {
    key: "allowNextMonth",
    value: function allowNextMonth() {
      var _props2 = this.props;
      var toMonth = _props2.toMonth;
      var numberOfMonths = _props2.numberOfMonths;

      if (!toMonth) {
        return true;
      }
      var currentMonth = this.state.currentMonth;

      return Helpers.getMonthsDiff(currentMonth, toMonth) >= numberOfMonths;
    }
  }, {
    key: "allowMonth",
    value: function allowMonth(d) {
      var _props3 = this.props;
      var fromMonth = _props3.fromMonth;
      var toMonth = _props3.toMonth;

      if (fromMonth && Helpers.getMonthsDiff(fromMonth, d) < 0 || toMonth && Helpers.getMonthsDiff(toMonth, d) > 0) {
        return false;
      }
      return true;
    }
  }, {
    key: "showMonth",
    value: function showMonth(d) {
      if (!this.allowMonth(d)) {
        return;
      }
      this.setState({
        currentMonth: Helpers.startOfMonth(d)
      });
    }
  }, {
    key: "showNextMonth",
    value: function showNextMonth(callback) {
      var _this3 = this;

      if (!this.allowNextMonth()) {
        return;
      }
      var currentMonth = this.state.currentMonth;

      var nextMonth = DateUtils.addMonths(currentMonth, 1);
      this.setState({
        currentMonth: nextMonth
      }, function () {
        if (callback) {
          callback();
        }
        if (_this3.props.onMonthChange) {
          _this3.props.onMonthChange(_this3.state.currentMonth);
        }
      });
    }
  }, {
    key: "showPreviousMonth",
    value: function showPreviousMonth(callback) {
      var _this4 = this;

      if (!this.allowPreviousMonth()) {
        return;
      }
      var currentMonth = this.state.currentMonth;

      var prevMonth = DateUtils.addMonths(currentMonth, -1);
      this.setState({
        currentMonth: prevMonth
      }, function () {
        if (callback) {
          callback();
        }
        if (_this4.props.onMonthChange) {
          _this4.props.onMonthChange(_this4.state.currentMonth);
        }
      });
    }
  }, {
    key: "focusPreviousDay",
    value: function focusPreviousDay(dayNode) {
      var body = dayNode.parentNode.parentNode.parentNode.parentNode;
      var dayNodes = body.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)");
      var nodeIndex = undefined;
      for (var i = 0; i < dayNodes.length; i++) {
        if (dayNodes[i] === dayNode) {
          nodeIndex = i;
          break;
        }
      }
      if (nodeIndex === 0) {
        var currentMonth = this.state.currentMonth;
        var numberOfMonths = this.props.numberOfMonths;

        var prevMonth = DateUtils.addMonths(currentMonth, -numberOfMonths);
        this.setState({
          currentMonth: prevMonth
        }, function () {
          dayNodes = body.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)");
          dayNodes[dayNodes.length - 1].focus();
        });
      } else {
        dayNodes[nodeIndex - 1].focus();
      }
    }
  }, {
    key: "focusNextDay",
    value: function focusNextDay(dayNode) {
      var body = dayNode.parentNode.parentNode.parentNode.parentNode;
      var dayNodes = body.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)");
      var nodeIndex = undefined;
      for (var i = 0; i < dayNodes.length; i++) {
        if (dayNodes[i] === dayNode) {
          nodeIndex = i;
          break;
        }
      }

      if (nodeIndex === dayNodes.length - 1) {
        var currentMonth = this.state.currentMonth;
        var numberOfMonths = this.props.numberOfMonths;

        var nextMonth = DateUtils.addMonths(currentMonth, numberOfMonths);
        this.setState({
          currentMonth: nextMonth
        }, function () {
          dayNodes = body.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--outside)");
          dayNodes[0].focus();
        });
      } else {
        dayNodes[nodeIndex + 1].focus();
      }
    }

    // Event handlers

  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _this5 = this;

      e.persist();

      if (!this.props.canChangeMonth && this.props.onKeyDown) {
        this.props.onKeyDown(e);
        return;
      }

      if (this.props.canChangeMonth) {
        var callback = this.props.onKeyDown ? function () {
          return _this5.props.onKeyDown(e);
        } : null;

        switch (e.keyCode) {
          case keys.LEFT:
            this.showPreviousMonth(callback);
            break;
          case keys.RIGHT:
            this.showNextMonth(callback);
            break;
        }
      }
    }
  }, {
    key: "handleDayKeyDown",
    value: function handleDayKeyDown(e, day, modifiers) {
      e.persist();
      switch (e.keyCode) {
        case keys.LEFT:
          e.preventDefault();
          e.stopPropagation();
          this.focusPreviousDay(e.target);
          break;
        case keys.RIGHT:
          e.preventDefault();
          e.stopPropagation();
          this.focusNextDay(e.target);
          break;
        case keys.ENTER:
        case keys.SPACE:
          e.preventDefault();
          e.stopPropagation();
          if (this.props.onDayClick) {
            this.handleDayClick(e, day, modifiers);
          }
          if (this.props.onDayTouchTap) {
            this.handleDayTouchTap(e, day, modifiers);
          }
          break;
      }
    }
  }, {
    key: "handleNextMonthClick",
    value: function handleNextMonthClick() {
      this.showNextMonth();
    }
  }, {
    key: "handlePrevMonthClick",
    value: function handlePrevMonthClick() {
      this.showPreviousMonth();
    }
  }, {
    key: "handleCaptionClick",
    value: function handleCaptionClick(e, currentMonth) {
      e.persist();
      this.props.onCaptionClick(e, currentMonth);
    }
  }, {
    key: "handleDayTouchTap",
    value: function handleDayTouchTap(e, day, modifiers) {
      e.persist();
      if (modifiers.indexOf("outside") > -1) {
        this.handleOutsideDayPress(day);
      }
      this.props.onDayTouchTap(e, day, modifiers);
    }
  }, {
    key: "handleDayClick",
    value: function handleDayClick(e, day, modifiers) {
      e.persist();
      if (modifiers.indexOf("outside") > -1) {
        this.handleOutsideDayPress(day);
      }

      this.props.onDayClick(e, day, modifiers);
    }
  }, {
    key: "handleDayMouseEnter",
    value: function handleDayMouseEnter(e, day, modifiers) {
      e.persist();
      this.props.onDayMouseEnter(e, day, modifiers);
    }
  }, {
    key: "handleDayMouseLeave",
    value: function handleDayMouseLeave(e, day, modifiers) {
      e.persist();
      this.props.onDayMouseLeave(e, day, modifiers);
    }
  }, {
    key: "handleOutsideDayPress",
    value: function handleOutsideDayPress(day) {
      var currentMonth = this.state.currentMonth;
      var numberOfMonths = this.props.numberOfMonths;

      var diffInMonths = Helpers.getMonthsDiff(currentMonth, day);
      if (diffInMonths > 0 && diffInMonths >= numberOfMonths) {
        this.showNextMonth();
      } else if (diffInMonths < 0) {
        this.showPreviousMonth();
      }
    }
  }, {
    key: "renderNavBar",
    value: function renderNavBar() {
      var baseClass = "DayPicker-NavButton DayPicker-NavButton";
      var isRTL = this.props.dir === "rtl";

      var leftButton = isRTL ? this.allowNextMonth() : this.allowPreviousMonth();
      var rightButton = isRTL ? this.allowPreviousMonth() : this.allowNextMonth();
      return _react2.default.createElement(
        "div",
        { className: "DayPicker-NavBar" },
        leftButton && _react2.default.createElement("span", {
          key: "left",
          className: baseClass + "--prev",
          onClick: isRTL ? this.handleNextMonthClick.bind(this) : this.handlePrevMonthClick.bind(this)
        }),
        rightButton && _react2.default.createElement("span", {
          key: "right",
          className: baseClass + "--next",
          onClick: isRTL ? this.handlePrevMonthClick.bind(this) : this.handleNextMonthClick.bind(this)
        })
      );
    }
  }, {
    key: "renderMonth",
    value: function renderMonth(date, i) {
      var _this6 = this;

      var _props4 = this.props;
      var locale = _props4.locale;
      var localeUtils = _props4.localeUtils;
      var onCaptionClick = _props4.onCaptionClick;
      var captionElement = _props4.captionElement;


      var caption = _react2.default.cloneElement(captionElement, {
        date: date, localeUtils: localeUtils, locale: locale,
        onClick: onCaptionClick ? function (e) {
          return _this6.handleCaptionClick(e, date);
        } : null
      });

      return _react2.default.createElement(
        "div",
        {
          className: "DayPicker-Month",
          key: i },
        caption,
        _react2.default.createElement(
          "div",
          { className: "DayPicker-Weekdays" },
          _react2.default.createElement(
            "div",
            { className: "DayPicker-WeekdaysRow" },
            this.renderWeekDays()
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "DayPicker-Body" },
          this.renderWeeksInMonth(date)
        )
      );
    }
  }, {
    key: "renderWeekDays",
    value: function renderWeekDays() {
      var _props5 = this.props;
      var locale = _props5.locale;
      var localeUtils = _props5.localeUtils;

      var days = [];
      for (var i = 0; i < 7; i++) {
        days.push(_react2.default.createElement(
          "div",
          { key: i, className: "DayPicker-Weekday" },
          _react2.default.createElement(
            "abbr",
            { title: localeUtils.formatWeekdayLong(i, locale) },
            localeUtils.formatWeekdayShort(i, locale)
          )
        ));
      }
      return days;
    }
  }, {
    key: "renderWeeksInMonth",
    value: function renderWeeksInMonth(month) {
      var _this7 = this;

      var _props6 = this.props;
      var locale = _props6.locale;
      var localeUtils = _props6.localeUtils;
      var numberOfWeeks = _props6.numberOfWeeks;

      var firstDayOfWeek = localeUtils.getFirstDayOfWeek(locale);
      return Helpers.getWeekArray(month, firstDayOfWeek, numberOfWeeks || 0).map(function (week, i) {
        return _react2.default.createElement(
          "div",
          { key: i, className: "DayPicker-Week", role: "row" },
          week.map(function (day) {
            return _this7.renderDay(month, day);
          })
        );
      });
    }
  }, {
    key: "renderDay",
    value: function renderDay(month, day) {
      var _this8 = this;

      var _props7 = this.props;
      var enableOutsideDays = _props7.enableOutsideDays;
      var modifierFunctions = _props7.modifiers;


      var className = "DayPicker-Day";
      var modifiers = [];
      var key = "" + day.getFullYear() + day.getMonth() + day.getDate();

      var isToday = DateUtils.isSameDay(day, new Date());
      if (isToday) {
        modifiers.push("today");
      }

      var isOutside = day.getMonth() !== month.getMonth();
      if (isOutside) {
        modifiers.push("outside");
      }

      if (modifierFunctions) {
        var customModifiers = Helpers.getModifiersForDay(day, modifierFunctions);
        modifiers = [].concat(_toConsumableArray(modifiers), _toConsumableArray(customModifiers));
      }

      className += modifiers.map(function (modifier) {
        return " " + className + "--" + modifier;
      }).join("");

      if (isOutside && !enableOutsideDays) {
        return _react2.default.createElement("div", { key: "outside-" + key, className: className });
      }

      var _props8 = this.props;
      var onDayMouseEnter = _props8.onDayMouseEnter;
      var onDayMouseLeave = _props8.onDayMouseLeave;
      var onDayTouchTap = _props8.onDayTouchTap;
      var onDayClick = _props8.onDayClick;

      var tabIndex = null;
      if ((onDayTouchTap || onDayClick) && !isOutside) {
        tabIndex = -1;
        // Focus on the first day of the month
        if (day.getDate() === 1) {
          tabIndex = this.props.tabIndex;
        }
      }
      return _react2.default.createElement(
        "div",
        { key: key, className: className,
          tabIndex: tabIndex,
          role: "gridcell",
          onKeyDown: function onKeyDown(e) {
            return _this8.handleDayKeyDown(e, day, modifiers);
          },
          onMouseEnter: onDayMouseEnter ? function (e) {
            return _this8.handleDayMouseEnter(e, day, modifiers);
          } : null,
          onMouseLeave: onDayMouseLeave ? function (e) {
            return _this8.handleDayMouseLeave(e, day, modifiers);
          } : null,
          onClick: onDayClick ? function (e) {
            return _this8.handleDayClick(e, day, modifiers);
          } : null,
          onTouchTap: onDayTouchTap ? function (e) {
            return _this8.handleDayTouchTap(e, day, modifiers);
          } : null
        },
        this.props.renderDay(day)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _props9 = this.props;
      var numberOfMonths = _props9.numberOfMonths;
      var locale = _props9.locale;
      var canChangeMonth = _props9.canChangeMonth;

      var attributes = _objectWithoutProperties(_props9, ["numberOfMonths", "locale", "canChangeMonth"]);

      var currentMonth = this.state.currentMonth;

      var className = "DayPicker DayPicker--" + locale;

      if (!this.props.onDayClick && !this.props.onDayTouchTap) {
        className = className + " DayPicker--interactionDisabled";
      }
      if (attributes.className) {
        className = className + " " + attributes.className;
      }

      var months = [];
      var month = undefined;
      for (var i = 0; i < numberOfMonths; i++) {
        month = DateUtils.addMonths(currentMonth, i);
        months.push(this.renderMonth(month, i));
      }

      return _react2.default.createElement(
        "div",
        _extends({ className: className,
          role: "widget",
          tabIndex: canChangeMonth && attributes.tabIndex,
          onKeyDown: function onKeyDown(e) {
            return _this9.handleKeyDown(e);
          }
        }, attributes),
        canChangeMonth && this.renderNavBar(),
        months
      );
    }
  }]);

  return DayPicker;
}(_react.Component);

DayPicker.propTypes = {

  initialMonth: _react.PropTypes.instanceOf(Date),
  numberOfMonths: _react.PropTypes.number,
  numberOfWeeks: _react.PropTypes.number,

  modifiers: _react.PropTypes.object,

  locale: _react.PropTypes.string,
  localeUtils: _react.PropTypes.shape({
    formatMonthTitle: _react.PropTypes.func,
    formatWeekdayShort: _react.PropTypes.func,
    formatWeekdayLong: _react.PropTypes.func,
    getFirstDayOfWeek: _react.PropTypes.func
  }),

  enableOutsideDays: _react.PropTypes.bool,
  canChangeMonth: _react.PropTypes.bool,
  fromMonth: _react.PropTypes.instanceOf(Date),
  toMonth: _react.PropTypes.instanceOf(Date),

  onDayClick: _react.PropTypes.func,
  onDayTouchTap: _react.PropTypes.func,
  onDayMouseEnter: _react.PropTypes.func,
  onDayMouseLeave: _react.PropTypes.func,
  onMonthChange: _react.PropTypes.func,
  onCaptionClick: _react.PropTypes.func,

  renderDay: _react.PropTypes.func,

  captionElement: _react.PropTypes.element

};
DayPicker.defaultProps = {
  tabIndex: 0,
  initialMonth: new Date(),
  numberOfMonths: 1,
  locale: "en",
  localeUtils: LocaleUtils,
  enableOutsideDays: false,
  canChangeMonth: true,
  renderDay: function renderDay(day) {
    return day.getDate();
  },
  captionElement: _react2.default.createElement(Caption, null)
};
exports.default = DayPicker;
//# sourceMappingURL=DayPicker.js.map