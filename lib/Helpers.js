"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startOfMonth = startOfMonth;
exports.getFirstDayOfMonth = getFirstDayOfMonth;
exports.getDaysInMonth = getDaysInMonth;
exports.getWeekArray = getWeekArray;
exports.getModifiersForDay = getModifiersForDay;
exports.getMonthsDiff = getMonthsDiff;

var _DateUtils = require("./DateUtils");

var _LocaleUtils = require("./LocaleUtils");

function startOfMonth(d) {
  var newDate = (0, _DateUtils.clone)(d);
  newDate.setDate(1);
  newDate.setHours(12, 0, 0, 0); // always set noon to avoid time zone issues
  return newDate;
}

function getFirstDayOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 12);
}

function getDaysInMonth(d) {
  var resultDate = getFirstDayOfMonth(d);

  resultDate.setMonth(resultDate.getMonth() + 1);
  resultDate.setDate(resultDate.getDate() - 1);

  return resultDate.getDate();
}

function getWeekArray(d) {
  var firstDayOfWeek = arguments.length <= 1 || arguments[1] === undefined ? (0, _LocaleUtils.getFirstDayOfWeek)() : arguments[1];
  var minWeeks = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  var daysInMonth = getDaysInMonth(d);
  var dayArray = [];

  var week = [];
  var weekArray = [];

  // populate dayArray with an array of dates
  // for each day of the month, setting the time at noon
  for (var i = 1; i <= daysInMonth; i++) {
    dayArray.push(new Date(d.getFullYear(), d.getMonth(), i, 12));
  }

  // use the dayArray to populate the weekArray, a collection
  // of arrays containing date objects
  dayArray.forEach(function (day) {
    // bounds check, start a new week if day is first day of the week
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      weekArray.push(week);
      week = [];
    }
    // add the current day to the current week
    week.push(day);
    // if the current day is the last day of the month,
    // add the current week to the weeksArray
    if (dayArray.indexOf(day) === dayArray.length - 1) {
      weekArray.push(week);
    }
  });

  // unshift days to start the first week
  var firstWeek = weekArray[0];
  for (var i = 7 - firstWeek.length; i > 0; i--) {
    var outsideDate = (0, _DateUtils.clone)(firstWeek[0]);
    outsideDate.setDate(firstWeek[0].getDate() - 1);
    firstWeek.unshift(outsideDate);
  }

  // push days until the end of the last week
  var lastWeek = weekArray[weekArray.length - 1];
  for (var i = lastWeek.length; i < 7; i++) {
    var outsideDate = (0, _DateUtils.clone)(lastWeek[lastWeek.length - 1]);
    outsideDate.setDate(lastWeek[lastWeek.length - 1].getDate() + 1);
    lastWeek.push(outsideDate);
  }

  // if minWeeks hasn't been met yet, continue adding days until
  // the minimum has been met
  if (weekArray.length < minWeeks) {
    var lastWeekIndex = weekArray.length - 1;
    var lastDayIndex = weekArray[lastWeekIndex].length - 1;
    var lastDay = weekArray[lastWeekIndex][lastDayIndex];
    var numWeeksToAdd = minWeeks - weekArray.length;
    // for each week that needs to be added, populate a new
    // week array and add it to the weeksArray
    for (var weekNum = 0; weekNum < numWeeksToAdd; weekNum++) {
      week = [];
      // for each day in the week, increment the lastDay by 1 day
      // and append it to the week array
      for (var dayNum = 0; dayNum < 7; dayNum++) {
        lastDay.setDate(lastDay.getDate() + 1);
        week.push((0, _DateUtils.clone)(lastDay));
      }
      weekArray.push(week);
    }
  }

  return weekArray;
}

function getModifiersForDay(d, modifierFunctions) {
  var modifiers = [];
  if (modifierFunctions) {
    for (var modifier in modifierFunctions) {
      var func = modifierFunctions[modifier];
      if (func(d)) {
        modifiers.push(modifier);
      }
    }
  }
  return modifiers;
}

function getMonthsDiff(d1, d2) {
  return d2.getMonth() - d1.getMonth() + 12 * (d2.getFullYear() - d1.getFullYear());
}
//# sourceMappingURL=Helpers.js.map