"use strict";

exports.__esModule = true;

var _uniqueHash = require("unique-hash");

var _uniqueHash2 = _interopRequireDefault(_uniqueHash);

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
        this.data = this.params.data ? this.params.data : {};
        if (this.params.data) {
            delete this.params.data;
        }
        if (this.params.callback) {
            this.callback = this.params.callback;
            delete this.params.callback;
        }
        this.hash = (0, _uniqueHash2.default)(this.params.start);
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