'use strict';

exports.__esModule = true;

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scenario = function () {
    function Scenario(startTime) {
        _classCallCheck(this, Scenario);

        this.params = {
            offset: -1,
            timer: 0,
            startTime: startTime,
            currentTime: startTime,
            endTime: startTime
        };
        this.scenes = [];
    }

    Scenario.prototype.removeScene = function removeScene(sceneToDelete) {
        var index = this.scenes.indexOf(sceneToDelete);
        if (index > -1) {
            this.scenes.splice(index, 1);
        }
    };

    Scenario.prototype.check = function check(timer) {
        this.params.timer = timer;
        for (var scene in this.scenes) {
            if (timer >= scene.start && scene.end && timer < scene.end && scene.enabled) {
                scene.callback(scene);
            }
        }
    };

    Scenario.prototype.updateEndTime = function updateEndTime(time) {
        this.params.endTime = time;
    };

    Scenario.prototype.seekTo = function seekTo(time) {
        this.params.currentTime = time;
        this.check(time);
    };

    Scenario.prototype.getType = function getType() {
        return this.data.type;
    };

    Scenario.prototype.add = function add(scene) {
        var s = new _Scene2.default(scene);
        this.scenes.push(s);
        return s;
    };

    return Scenario;
}();

exports.default = Scenario;