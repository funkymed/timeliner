"use strict";

exports.__esModule = true;

var _uniqueHash = require("unique-hash");

var _uniqueHash2 = _interopRequireDefault(_uniqueHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tools with static transverse functions
 */
var Tools = function () {
    function Tools() {
        _classCallCheck(this, Tools);
    }

    Tools.hhmmss = function hhmmss(sec) {
        var o = new Date(0);
        o.setSeconds(sec);
        var p = new Date(sec * 1000);
        return o.toISOString().substr(11, 8) + "." + p.getMilliseconds();
    };

    Tools.getHash = function getHash(data) {
        return (0, _uniqueHash2.default)(data);
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