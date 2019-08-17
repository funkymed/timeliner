"use strict";

exports.__esModule = true;

var _Timeline = require("./Timeline");

var _Timeline2 = _interopRequireDefault(_Timeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
    function Scene(params) {
        _classCallCheck(this, Scene);

        this.params = params;
        this.params.enabled = this.params.enabled ? this.params.enabled : true;
        this.data = this.params.data ? this.params.data : {};
        this.passed = false;
        if (this.params.data) {
            delete this.params.data;
        }
        if (this.params.callback) {
            this.callback = this.params.callback;
            delete this.params.callback;
        }
        this.id = this.generateUid();
        this.hash = this.params.start + "-" + this.params.type + "-" + this.params.end;
    }

    Scene.prototype.getType = function getType() {
        return this.params.type ? this.params.type : "default";
    };

    Scene.prototype.getEnd = function getEnd() {
        return this.params.end;
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