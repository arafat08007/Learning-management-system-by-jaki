/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ui-huma/js/page.erp-dashboard.js":
/*!*******************************************************!*\
  !*** ./node_modules/ui-huma/js/page.erp-dashboard.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  'use strict';

  var earnings = [];
  var prev = [];
  var backgroundColor = []; // Create a date range for the last 7 days

  var start = moment().subtract(6, 'days').format('YYYY-MM-DD'); // 7 days ago

  var end = moment().format('YYYY-MM-DD'); // today

  var range = moment.range(start, end); // Create the earnings graph data
  // Iterate the date range and assign a random ($) earnings value for each day

  range.by('days', function (m) {
    earnings.push({
      y: Math.floor(Math.random() * 300) + 30,
      x: m.toDate()
    });
    prev.push({
      y: Math.floor(Math.random() * 300) + 10,
      x: m.toDate()
    });

    if (m.startOf('day').isSame(moment().startOf('day'))) {
      backgroundColor.push(settings.colors.accent[500]);
    } else {
      backgroundColor.push(settings.colors.primary[500]);
    }
  });

  var Earnings = function Earnings(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'roundedBar';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      barRoundness: 1.2,
      title: {
        display: true,
        fontSize: 12,
        fontColor: 'rgba(54, 76, 102, 0.54)',
        position: 'top',
        text: 'GENERATED INCOME'
      },
      scales: {
        yAxes: [{
          ticks: {
            maxTicksLimit: 4
          }
        }],
        xAxes: [{
          offset: true,
          ticks: {
            padding: 10
          },
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D/MM'
            },
            maxTicksLimit: 7
          }
        }]
      }
    }, options);
    var data = {
      datasets: [{
        label: "Previous Week",
        data: prev,
        barThickness: 20
      }, {
        label: "Last Week",
        data: earnings,
        barThickness: 20
      }]
    };
    Charts.create(id, type, options, data);
  };

  var Views = function Views(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'line';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = Chart.helpers.merge({
      scales: {
        xAxes: [{
          display: false,
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            unit: 'day'
          }
        }]
      }
    }, options);
    var data = [];
    var conversion = []; // Create a date range for the last 7 days

    var start = moment().subtract(7, 'days').format('YYYY-MM-DD'); // 7 days ago

    var end = moment().format('YYYY-MM-DD'); // today

    var range = moment.range(start, end); // Create the graph data
    // Iterate the date range and assign a random value for each day

    range.by('days', function (moment) {
      var views = Math.floor(Math.random() * 300) + 10;
      data.push({
        y: views,
        x: moment.toDate()
      });
      conversion.push({
        y: Math.round(views * 0.5),
        x: moment.toDate()
      });
    });
    var data = {
      datasets: [{
        label: "Conversion",
        data: conversion
      }, {
        label: "Views",
        data: data
      }]
    };
    Charts.create(id, type, options, data);
  }; // Create Chart


  Earnings('#earningsChart');
  Views('#viewsChart');
})();

/***/ }),

/***/ "./src/js/page.erp-dashboard.js":
/*!**************************************!*\
  !*** ./src/js/page.erp-dashboard.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ui_huma_js_page_erp_dashboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui-huma/js/page.erp-dashboard */ "./node_modules/ui-huma/js/page.erp-dashboard.js");
/* harmony import */ var ui_huma_js_page_erp_dashboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ui_huma_js_page_erp_dashboard__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ 15:
/*!********************************************!*\
  !*** multi ./src/js/page.erp-dashboard.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\works\website\Python\Project 1 Django\temp\src\js\page.erp-dashboard.js */"./src/js/page.erp-dashboard.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VpLWh1bWEvanMvcGFnZS5lcnAtZGFzaGJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYWdlLmVycC1kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiZWFybmluZ3MiLCJwcmV2IiwiYmFja2dyb3VuZENvbG9yIiwic3RhcnQiLCJtb21lbnQiLCJzdWJ0cmFjdCIsImZvcm1hdCIsImVuZCIsInJhbmdlIiwiYnkiLCJtIiwicHVzaCIsInkiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ4IiwidG9EYXRlIiwic3RhcnRPZiIsImlzU2FtZSIsInNldHRpbmdzIiwiY29sb3JzIiwiYWNjZW50IiwicHJpbWFyeSIsIkVhcm5pbmdzIiwiaWQiLCJ0eXBlIiwib3B0aW9ucyIsIkNoYXJ0IiwiaGVscGVycyIsIm1lcmdlIiwiYmFyUm91bmRuZXNzIiwidGl0bGUiLCJkaXNwbGF5IiwiZm9udFNpemUiLCJmb250Q29sb3IiLCJwb3NpdGlvbiIsInRleHQiLCJzY2FsZXMiLCJ5QXhlcyIsInRpY2tzIiwibWF4VGlja3NMaW1pdCIsInhBeGVzIiwib2Zmc2V0IiwicGFkZGluZyIsImdyaWRMaW5lcyIsInRpbWUiLCJ1bml0IiwiZGlzcGxheUZvcm1hdHMiLCJkYXkiLCJkYXRhIiwiZGF0YXNldHMiLCJsYWJlbCIsImJhclRoaWNrbmVzcyIsIkNoYXJ0cyIsImNyZWF0ZSIsIlZpZXdzIiwiY29udmVyc2lvbiIsInZpZXdzIiwicm91bmQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7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LEVBQWQsRUFBa0JDLElBQWxCLEVBQXdCQyxPQUF4QixFQUFpQ3VCLElBQWpDO0FBQ0QsR0FqREQsQ0FuRlMsQ0FzSVQ7OztBQUNBMUIsVUFBUSxDQUFDLGdCQUFELENBQVI7QUFDQWdDLE9BQUssQ0FBQyxhQUFELENBQUw7QUFFRCxDQTFJRCxJOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUEiLCJmaWxlIjoiL2Rpc3QvYXNzZXRzL2pzL3BhZ2UuZXJwLWRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTUpO1xuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICB2YXIgZWFybmluZ3MgPSBbXVxyXG4gIHZhciBwcmV2ID0gW11cclxuICB2YXIgYmFja2dyb3VuZENvbG9yID0gW11cclxuXHJcbiAgLy8gQ3JlYXRlIGEgZGF0ZSByYW5nZSBmb3IgdGhlIGxhc3QgNyBkYXlzXHJcbiAgdmFyIHN0YXJ0ID0gbW9tZW50KCkuc3VidHJhY3QoNiwgJ2RheXMnKS5mb3JtYXQoJ1lZWVktTU0tREQnKSAvLyA3IGRheXMgYWdvXHJcbiAgdmFyIGVuZCA9IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpIC8vIHRvZGF5XHJcbiAgdmFyIHJhbmdlID0gbW9tZW50LnJhbmdlKHN0YXJ0LCBlbmQpXHJcblxyXG4gIC8vIENyZWF0ZSB0aGUgZWFybmluZ3MgZ3JhcGggZGF0YVxyXG4gIC8vIEl0ZXJhdGUgdGhlIGRhdGUgcmFuZ2UgYW5kIGFzc2lnbiBhIHJhbmRvbSAoJCkgZWFybmluZ3MgdmFsdWUgZm9yIGVhY2ggZGF5XHJcbiAgcmFuZ2UuYnkoJ2RheXMnLCBmdW5jdGlvbihtKSB7XHJcbiAgICBlYXJuaW5ncy5wdXNoKHtcclxuICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzAwKSArIDMwLFxyXG4gICAgICB4OiBtLnRvRGF0ZSgpXHJcbiAgICB9KVxyXG4gICAgcHJldi5wdXNoKHtcclxuICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzAwKSArIDEwLFxyXG4gICAgICB4OiBtLnRvRGF0ZSgpXHJcbiAgICB9KVxyXG5cclxuICAgIGlmIChtLnN0YXJ0T2YoJ2RheScpLmlzU2FtZShtb21lbnQoKS5zdGFydE9mKCdkYXknKSkpIHtcclxuICAgICAgYmFja2dyb3VuZENvbG9yLnB1c2goc2V0dGluZ3MuY29sb3JzLmFjY2VudFs1MDBdKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGJhY2tncm91bmRDb2xvci5wdXNoKHNldHRpbmdzLmNvbG9ycy5wcmltYXJ5WzUwMF0pXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgdmFyIEVhcm5pbmdzID0gZnVuY3Rpb24oaWQsIHR5cGUgPSAncm91bmRlZEJhcicsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgb3B0aW9ucyA9IENoYXJ0LmhlbHBlcnMubWVyZ2Uoe1xyXG4gICAgICBiYXJSb3VuZG5lc3M6IDEuMixcclxuICAgICAgdGl0bGU6IHtcclxuICAgICAgICBkaXNwbGF5OiB0cnVlLFxyXG4gICAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgICBmb250Q29sb3I6ICdyZ2JhKDU0LCA3NiwgMTAyLCAwLjU0KScsXHJcbiAgICAgICAgcG9zaXRpb246ICd0b3AnLFxyXG4gICAgICAgIHRleHQ6ICdHRU5FUkFURUQgSU5DT01FJ1xyXG4gICAgICB9LFxyXG4gICAgICBzY2FsZXM6IHtcclxuICAgICAgICB5QXhlczogW3tcclxuICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgIG1heFRpY2tzTGltaXQ6IDRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XSxcclxuICAgICAgICB4QXhlczogW3tcclxuICAgICAgICAgIG9mZnNldDogdHJ1ZSxcclxuICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZ3JpZExpbmVzOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdHlwZTogJ3RpbWUnLFxyXG4gICAgICAgICAgdGltZToge1xyXG4gICAgICAgICAgICB1bml0OiAnZGF5JyxcclxuICAgICAgICAgICAgZGlzcGxheUZvcm1hdHM6IHtcclxuICAgICAgICAgICAgICBkYXk6ICdEL01NJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYXhUaWNrc0xpbWl0OiA3XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxuICAgICAgfVxyXG4gICAgfSwgb3B0aW9ucylcclxuXHJcbiAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgZGF0YXNldHM6IFt7XHJcbiAgICAgICAgbGFiZWw6IFwiUHJldmlvdXMgV2Vla1wiLFxyXG4gICAgICAgIGRhdGE6IHByZXYsXHJcbiAgICAgICAgYmFyVGhpY2tuZXNzOiAyMFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IFwiTGFzdCBXZWVrXCIsXHJcbiAgICAgICAgZGF0YTogZWFybmluZ3MsXHJcbiAgICAgICAgYmFyVGhpY2tuZXNzOiAyMFxyXG4gICAgICB9XVxyXG4gICAgfVxyXG5cclxuICAgIENoYXJ0cy5jcmVhdGUoaWQsIHR5cGUsIG9wdGlvbnMsIGRhdGEpXHJcbiAgfVxyXG5cclxuICB2YXIgVmlld3MgPSBmdW5jdGlvbihpZCwgdHlwZSA9ICdsaW5lJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBvcHRpb25zID0gQ2hhcnQuaGVscGVycy5tZXJnZSh7XHJcbiAgICAgIHNjYWxlczoge1xyXG4gICAgICAgIHhBeGVzOiBbe1xyXG4gICAgICAgICAgZGlzcGxheTogZmFsc2UsXHJcbiAgICAgICAgICBncmlkTGluZXM6IHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmFsc2VcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0eXBlOiAndGltZScsXHJcbiAgICAgICAgICB0aW1lOiB7XHJcbiAgICAgICAgICAgIHVuaXQ6ICdkYXknXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxuICAgICAgfVxyXG4gICAgfSwgb3B0aW9ucylcclxuXHJcbiAgICB2YXIgZGF0YSA9IFtdXHJcbiAgICB2YXIgY29udmVyc2lvbiA9IFtdXHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgZGF0ZSByYW5nZSBmb3IgdGhlIGxhc3QgNyBkYXlzXHJcbiAgICB2YXIgc3RhcnQgPSBtb21lbnQoKS5zdWJ0cmFjdCg3LCAnZGF5cycpLmZvcm1hdCgnWVlZWS1NTS1ERCcpIC8vIDcgZGF5cyBhZ29cclxuICAgIHZhciBlbmQgPSBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKSAvLyB0b2RheVxyXG4gICAgdmFyIHJhbmdlID0gbW9tZW50LnJhbmdlKHN0YXJ0LCBlbmQpXHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBncmFwaCBkYXRhXHJcbiAgICAvLyBJdGVyYXRlIHRoZSBkYXRlIHJhbmdlIGFuZCBhc3NpZ24gYSByYW5kb20gdmFsdWUgZm9yIGVhY2ggZGF5XHJcbiAgICByYW5nZS5ieSgnZGF5cycsIGZ1bmN0aW9uKG1vbWVudCkge1xyXG4gICAgICBjb25zdCB2aWV3cyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwMCkgKyAxMFxyXG4gICAgICBkYXRhLnB1c2goe1xyXG4gICAgICAgIHk6IHZpZXdzLFxyXG4gICAgICAgIHg6IG1vbWVudC50b0RhdGUoKVxyXG4gICAgICB9KVxyXG4gICAgICBjb252ZXJzaW9uLnB1c2goe1xyXG4gICAgICAgIHk6IE1hdGgucm91bmQodmlld3MgKiAwLjUpLFxyXG4gICAgICAgIHg6IG1vbWVudC50b0RhdGUoKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgZGF0YXNldHM6IFt7XHJcbiAgICAgICAgbGFiZWw6IFwiQ29udmVyc2lvblwiLFxyXG4gICAgICAgIGRhdGE6IGNvbnZlcnNpb25cclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiBcIlZpZXdzXCIsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICB9XVxyXG4gICAgfVxyXG5cclxuICAgIENoYXJ0cy5jcmVhdGUoaWQsIHR5cGUsIG9wdGlvbnMsIGRhdGEpXHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGUgQ2hhcnRcclxuICBFYXJuaW5ncygnI2Vhcm5pbmdzQ2hhcnQnKVxyXG4gIFZpZXdzKCcjdmlld3NDaGFydCcpXHJcblxyXG59KSgpIiwiaW1wb3J0ICd1aS1odW1hL2pzL3BhZ2UuZXJwLWRhc2hib2FyZCciXSwic291cmNlUm9vdCI6IiJ9