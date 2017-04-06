/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./actions/actionCreators.test.js": 2,
	"./reducers/reducers.test.js": 9
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 0;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var testsContext = __webpack_require__(0);

var runnable = testsContext.keys();

runnable.forEach(testsContext);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// xdescribe('ActionCreator', () => {
//   it('should be a function'), () => {
//     expect()
//   });
//
//   it('should include a type', () {
//
//   });
// });

//actions desired:
// add survey
// remove survey
// add question
// remove question
// add option
// remove Option
// increment votes


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var options = {
  "1": [{
    "label": "logistical",
    "votes": 1
  }, {
    "label": "4th generation",
    "votes": 2
  }, {
    "label": "uniform",
    "votes": 3
  }],
  "2": [{
    "label": "capacity",
    "votes": 1
  }, {
    "label": "database",
    "votes": 2
  }, {
    "label": "framework",
    "votes": 3
  }],
  "3": [{
    "votes": 1
  }, {
    "votes": 2
  }, {
    "votes": 3
  }],
  "4": [{
    "label": "approach",
    "votes": 1
  }, {
    "label": "contingency",
    "votes": 2
  }, {
    "label": "multi-tasking",
    "votes": 3
  }],
  "5": [{
    "label": "software",
    "votes": 1
  }, {
    "label": "intranet",
    "votes": 2
  }, {
    "label": "model",
    "votes": 3
  }],
  "6": [{
    "label": "exuding",
    "votes": 1
  }, {
    "label": "Quality-focused",
    "votes": 2
  }, {
    "label": "logistical",
    "votes": 3
  }],
  "7": [{
    "label": "Fully-configurable",
    "votes": 1
  }, {
    "label": "attitude-oriented",
    "votes": 2
  }, {
    "label": "Re-contextualized",
    "votes": 3
  }],
  "8": [{
    "label": "strategy",
    "votes": 1
  }, {
    "label": "Enhanced",
    "votes": 2
  }, {
    "label": "Robust",
    "votes": 3
  }],
  "9": [{
    "label": "utilisation",
    "votes": 1
  }, {
    "label": "Customizable",
    "votes": 2
  }, {
    "label": "leading edge",
    "votes": 3
  }]
};

exports.default = options;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var questions = {
  "1": [{
    "questionId": 1,
    "label": "Public-key"
  }, {
    "questionId": 2,
    "label": "Compatible"
  }, {
    "questionId": 3,
    "label": "Digitized"
  }],
  "2": [{
    "questionId": 4,
    "label": "directional"
  }, {
    "questionId": 5,
    "label": "Secured"
  }, {
    "questionId": 6,
    "label": "Devolved"
  }],
  "3": [{
    "questionId": 7,
    "label": "contextually-based"
  }, {
    "questionId": 8,
    "label": "zero administration"
  }, {
    "questionId": 9,
    "label": "structure"
  }]
};

exports.default = questions;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var surveys = [{
  "id": 1,
  "title": "Right-sized holistic middleware"
}, {
  "id": 2,
  "title": "Cloned disintermediate hardware"
}, {
  "id": 3,
  "title": "Centralized full-range moratorium"
}];

exports.default = surveys;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(14);

var _reactRouterRedux = __webpack_require__(13);

var _surveys = __webpack_require__(10);

var _surveys2 = _interopRequireDefault(_surveys);

var _questions = __webpack_require__(8);

var _questions2 = _interopRequireDefault(_questions);

var _options = __webpack_require__(7);

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({ surveys: _surveys2.default, questions: _questions2.default, options: _options2.default, routing: _reactRouterRedux.routerReducer });

exports.default = rootReducer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = options;
function options() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_OPTIONS':
      return state;
    case 'REMOVE_OPTIONS':
      return state;
    case 'EDIT_OPTIONS':
      return state;
    case 'INCREMENT_VOTES':
      return state;
    default:
      return state;
  }
}

exports.default = options;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.questions = questions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function surveyQuestions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_QUESTION':
      return [].concat(_toConsumableArray(state), [{
        id: action.id,
        label: action.label
      }]);
    case 'REMOVE_QUESTION':
      return [].concat(_toConsumableArray(state.slice(0, action.i)), _toConsumableArray(state.slice(action.i + 1)));
    case 'EDIT_QUESTION':
      return [].concat(_toConsumableArray(state.slice(0, action.i)), [Object.assign({}, state[action.i], { label: action.label })], _toConsumableArray(state.slice(action.i + 1)));
    default:
      return state;
  }
}

function questions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (typeof action.surveyId !== 'undefined') {
    return _extends({}, state, _defineProperty({}, action.surveyId, surveyQuestions(state[action.surveyId], action)));
  }
  return state;
}

exports.default = questions;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chai = __webpack_require__(11);

var _chai2 = _interopRequireDefault(_chai);

var _deepFreeze = __webpack_require__(12);

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

var _surveys = __webpack_require__(5);

var _surveys2 = _interopRequireDefault(_surveys);

var _questions = __webpack_require__(4);

var _questions2 = _interopRequireDefault(_questions);

var _options = __webpack_require__(3);

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  surveys: _surveys2.default,
  questions: _questions2.default,
  options: _options2.default
};

var expect = _chai2.default.expect;


describe('Reducers', function () {
  // unit tests for surveys reducer
  describe('Surveys', function () {
    describe('ADD_SURVEY', function () {
      it('should add a survey to the current list of surveys', function () {
        var survey = {
          id: 4,
          title: 'Expanded'
        };

        var action = Object.assign({}, survey, { type: 'ADD_SURVEY' });

        (0, _deepFreeze2.default)(initialState);

        var changedState = (0, _index2.default)(initialState, action);

        expect(changedState.surveys.length).to.equal(4);
        expect(JSON.stringify(changedState.surveys[3])).to.equal(JSON.stringify(survey));
      });
    });

    describe('REMOVE_SURVEY', function () {
      it('should remove a survey from the current list of surveys', function () {
        var action = {
          type: 'REMOVE_SURVEY',
          i: 2
        };

        (0, _deepFreeze2.default)(initialState);

        var changedState = (0, _index2.default)(initialState, action);
        expect(changedState.surveys.length).to.equal(2);
        expect(changedState.surveys[2]).to.not.exist;
      });
    });

    describe('EDIT_SURVEY', function () {
      it('should edit an existing survey in the list of surveys', function () {
        var survey = {
          title: 'Fabulous'
        };

        var action = Object.assign({}, survey, { type: 'EDIT_SURVEY', i: 1 });

        (0, _deepFreeze2.default)(initialState);

        var changedState = (0, _index2.default)(initialState, action);

        expect(changedState.surveys.length).to.equal(3);
        expect(JSON.stringify(changedState.surveys[1].title)).to.equal(JSON.stringify(survey.title));
        expect(JSON.stringify(changedState.surveys[0])).to.equal(JSON.stringify(initialState.surveys[0]));
        expect(JSON.stringify(changedState.surveys[2])).to.equal(JSON.stringify(initialState.surveys[2]));
      });
    });
  });
  // unit tests for questions reducer
  describe('Questions', function () {
    describe('ADD_QUESTION', function () {
      it('should add a question to the current list of questions', function () {
        var surveyId = 1;
        var question = {
          id: 10,
          label: 'Meow?'
        };

        var action = Object.assign({}, question, { type: 'ADD_QUESTION', surveyId: surveyId });

        (0, _deepFreeze2.default)(initialState);

        var changedState = (0, _index2.default)(initialState, action);

        expect(changedState.questions[surveyId].length).to.equal(4);
        expect(JSON.stringify(changedState.questions[surveyId][3])).to.equal(JSON.stringify(question));
      });
    });
    describe('REMOVE_QUESTION', function () {
      it('should remove a question from the current list of questions', function () {
        var action = {
          surveyId: 1,
          type: 'REMOVE_QUESTION',
          i: 2
        };

        (0, _deepFreeze2.default)(initialState);

        var changedState = (0, _index2.default)(initialState, action);

        expect(changedState.questions[1].length).to.equal(2);
        expect(changedState.questions[1][2]).to.not.exist;
      });
    });
    describe('EDIT_QUESTION', function () {
      it('should edit an existing question in the list of questions', function () {
        var surveyId = 1;
        var question = {
          i: 1,
          label: 'Megan and Jin are the BEST'
        };

        var action = Object.assign({}, question, { type: 'EDIT_QUESTION', surveyId: surveyId });

        (0, _deepFreeze2.default)(initialState);

        var changedState = (0, _index2.default)(initialState, action);

        expect(changedState.questions[1].length).to.equal(3);
        expect(JSON.stringify(changedState.questions[1][1].label)).to.equal(JSON.stringify(question.label));
        expect(JSON.stringify(changedState.questions[1][0])).to.equal(JSON.stringify(initialState.questions[1][0]));
        expect(JSON.stringify(changedState.questions[1][2])).to.equal(JSON.stringify(initialState.questions[1][2]));
      });
    });
  });
});

//
//  // unit tests for options reducer
//  xdescribe('Options', () => {
//    describe('ADD_OPTION', () => {
//
//    });
//    describe('REMOVE_OPTION', () => {
//
//    });
//    describe('EDIT_OPTION', () => {
//
//    });
//    describe('INCREMENT_VOTES', () => {
//
//    });
//   //  });
// });

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.surveys = surveys;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function surveys() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_SURVEY':
      return [].concat(_toConsumableArray(state), [{
        id: action.id,
        title: action.title
      }]);
    case 'REMOVE_SURVEY':
      return [].concat(_toConsumableArray(state.slice(0, action.i)), _toConsumableArray(state.slice(action.i + 1)));
    case 'EDIT_SURVEY':
      return [].concat(_toConsumableArray(state.slice(0, action.i)), [Object.assign({}, state[action.i], { title: action.title })], _toConsumableArray(state.slice(action.i + 1)));
    default:
      return state;
  }
}

exports.default = surveys;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("deep-freeze");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ })
/******/ ]);