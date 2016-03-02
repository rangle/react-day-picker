"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMonthTitle = formatMonthTitle;
exports.formatWeekdayShort = formatWeekdayShort;
exports.formatWeekdayLong = formatWeekdayLong;
exports.getFirstDayOfWeek = getFirstDayOfWeek;
exports.getMonths = getMonths;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatMonthTitle(date) {
  var locale = arguments.length <= 1 || arguments[1] === undefined ? "en" : arguments[1];

  return (0, _moment2.default)(date).locale(locale).format("MMMM YYYY");
}

function formatWeekdayShort(day) {
  var locale = arguments.length <= 1 || arguments[1] === undefined ? "en" : arguments[1];

  return (0, _moment2.default)().locale(locale).weekday(day).format("dd");
}

function formatWeekdayLong(day) {
  var locale = arguments.length <= 1 || arguments[1] === undefined ? "en" : arguments[1];

  return (0, _moment2.default)().locale(locale).weekday(day).format("dddd");
}

function getFirstDayOfWeek() {
  var locale = arguments.length <= 0 || arguments[0] === undefined ? "en" : arguments[0];

  var localeData = _moment2.default.localeData(locale);
  return localeData.firstDayOfWeek();
}

function getMonths() {
  var locale = arguments.length <= 0 || arguments[0] === undefined ? "en" : arguments[0];

  var months = [];
  var i = 0;
  while (i < 12) {
    months.push((0, _moment2.default)().locale(locale).month(i++).format("MMMM"));
  }
  return months;
}

exports.default = {
  formatMonthTitle: formatMonthTitle,
  formatWeekdayShort: formatWeekdayShort,
  formatWeekdayLong: formatWeekdayLong,
  getFirstDayOfWeek: getFirstDayOfWeek,
  getMonths: getMonths
};
//# sourceMappingURL=MomentLocaleUtils.js.map