'use strict';

exports.__esModule = true;

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scenario = function () {
    function Scenario() {
        _classCallCheck(this, Scenario);

        this.offset = -1;
        this.scenes = [];
        this.timer = 0;
        this.startTime = json.start;
    }

    Scenario.prototype.startTime = function startTime(time) {
        this.startTime = time;
    };

    Scenario.prototype.removeScene = function removeScene(scene) {};

    Scenario.prototype.disableType = function disableType(type) {};

    Scenario.prototype.check = function check(timer) {
        this.timer = timer;
        this.scenes.forEach(function (scene) {
            if (timer >= scene.start && scene.end && timer < scene.end && scene.enabled) {
                scene.callback();
            }
        });
    };

    Scenario.prototype.seekTo = function seekTo(time) {
        //audio.currentTime=time;
        this.startTime = time;
        this.check(time);
    };

    Scenario.prototype.add = function add(scene) {
        this.scenes.push(scene);
    };

    return Scenario;
}();

exports.default = Scenario;