"use strict";

exports.__esModule = true;

var _uniqueHash = require("unique-hash");

var _uniqueHash2 = _interopRequireDefault(_uniqueHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tools = function () {
    function Tools() {
        _classCallCheck(this, Tools);
    }

    Tools.hhmmss = function hhmmss(secs) {
        var minutes = Math.floor(secs / 60);
        secs = secs % 60;
        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        return Tools.pad(hours) + ":" + Tools.pad(minutes) + ":" + Tools.pad(secs);
        // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
    };

    Tools.pad = function pad(num) {
        return ("0" + num).slice(-2);
    };

    Tools.generateUid = function generateUid(separator) {
        var delim = separator || "-";
        function S4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        }
        return S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4();
    };

    return Tools;
}();

exports.default = Tools;