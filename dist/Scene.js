"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Timeline = _interopRequireDefault(require("./Timeline"));

var _Type = _interopRequireDefault(require("./Type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scene =
/*#__PURE__*/
function () {
  function Scene(params) {
    _classCallCheck(this, Scene);

    this.params = _objectSpread({}, params, {
      id: this.generateUid(),
      enabled: true
    });

    if (this.params.callback) {
      this.callback = this.params.callback;
    }
  }

  _createClass(Scene, [{
    key: "getType",
    value: function getType() {
      return this.params.type ? this.params.type : TypeDefault;
    }
  }, {
    key: "enable",
    value: function enable(enabled) {
      this.params.enabled = enabled;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name = name ? name : this.id;
    }
  }, {
    key: "generateUid",
    value: function generateUid(separator) {
      var delim = separator || "-";

      function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      }

      return S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4();
    }
    /**
     * use Callback to fireevent when the timeline hit the start time
     */

  }, {
    key: "callback",
    value: function callback() {}
  }]);

  return Scene;
}();

exports["default"] = Scene;