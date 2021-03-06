"use strict";

exports.__esModule = true;

var _Tools = require("./Tools");

var _Tools2 = _interopRequireDefault(_Tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
    function Scene(params) {
        _classCallCheck(this, Scene);

        this.params = params;
        this.params.enabled = this.params.enabled ? this.params.enabled : true;
        this.params.timecode = _Tools2.default.hhmmss(this.params.start);
        if (!this.params.data) {
            this.params.data = {};
        }

        if (this.params.callback) {
            this.callback = this.params.callback;
            delete this.params.callback;
        }
        this.hash = _Tools2.default.getHash([this.params.start, this.params.type, this.params.end].join("-"));
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

    Scene.prototype.callback = function callback(scene) {};

    return Scene;
}();

exports.default = Scene;