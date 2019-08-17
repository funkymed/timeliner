"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Timeline = require("./Timeline");

var _Timeline2 = _interopRequireDefault(_Timeline);

var _Type = require("./Type");

var _Type2 = _interopRequireDefault(_Type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
    function Scene(params) {
        _classCallCheck(this, Scene);

        this.params = _extends({}, params, {
            id: this.generateUid(),
            enabled: true,
            start: 0,
            end: 0,
            data: {}
        });
        if (this.params.callback) {
            this.callback = this.params.callback;
        }
    }

    Scene.prototype.getType = function getType() {
        return this.params.type ? this.params.type : TypeDefault;
    };

    Scene.prototype.enable = function enable(enabled) {
        this.params.enabled = enabled;
    };

    Scene.prototype.getName = function getName() {
        return this.name = name ? name : this.id;
    };

    Scene.prototype.generateUid = function generateUid(separator) {
        var delim = separator || "-";

        function S4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        }

        return S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4();
    };

    /**
     * use Callback to fireevent when the timeline hit the start time
     */


    Scene.prototype.callback = function callback(scene) {};

    return Scene;
}();

exports.default = Scene;