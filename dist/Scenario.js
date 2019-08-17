'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scenario = function () {
    function Scenario(params) {
        _classCallCheck(this, Scenario);

        this.params = _extends({}, params, {
            offset: -1,
            scenes: [],
            timer: 0,
            startTime: 0
        });
        this.start(this.params.startTime);
    }

    Scenario.prototype.start = function start(time) {
        this.params.startTime = time;
    };

    Scenario.prototype.removeScene = function removeScene(sceneToDelete) {
        var index = this.params.scenes.indexOf(sceneToDelete);
        if (index > -1) {
            this.params.scenes.splice(index, 1);
        }
    };

    Scenario.prototype.check = function check(timer) {
        this.params.timer = timer;
        this.params.scenes.forEach(function (scene) {
            if (timer >= scene.start && scene.end && timer < scene.end && scene.enabled) {
                scene.callback(scene);
            }
        });
    };

    Scenario.prototype.seekTo = function seekTo(time) {
        //audio.currentTime=time;
        this.params.startTime = time;
        this.check(time);
    };

    Scenario.prototype.addScene = function addScene(scene) {
        this.params.scenes.push(scene);
    };

    return Scenario;
}();

exports.default = Scenario;