"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Scene = _interopRequireDefault(require("./Scene"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scenario =
/*#__PURE__*/
function () {
  function Scenario(params) {
    _classCallCheck(this, Scenario);

    this.params = _objectSpread({}, params, {
      offset: -1,
      scenes: [],
      timer: 0,
      startTime: 0
    });
    this.start(this.params.startTime);
  }

  _createClass(Scenario, [{
    key: "start",
    value: function start(time) {
      this.params.startTime = time;
    }
  }, {
    key: "removeScene",
    value: function removeScene(scene) {}
  }, {
    key: "disableType",
    value: function disableType(type) {}
  }, {
    key: "check",
    value: function check(timer) {
      this.params.timer = timer;
      this.params.scenes.forEach(function (scene) {
        if (timer >= scene.start && scene.end && timer < scene.end && scene.enabled) {
          scene.callback();
        }
      });
    }
  }, {
    key: "seekTo",
    value: function seekTo(time) {
      //audio.currentTime=time;
      this.params.startTime = time;
      this.check(time);
    }
  }, {
    key: "addScene",
    value: function addScene(scene) {
      this.params.scenes.push(scene);
    }
  }]);

  return Scenario;
}();

exports["default"] = Scenario;