'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scenario = require('./Scenario');

var _Scenario2 = _interopRequireDefault(_Scenario);

var _reactMoment = require('react-moment');

var _reactMoment2 = _interopRequireDefault(_reactMoment);

require('moment-timezone');

var _moment = require('moment');

var moment = _interopRequireWildcard(_moment);

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = function (_Component) {
    _inherits(Timeline, _Component);

    function Timeline(props) {
        _classCallCheck(this, Timeline);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = { data: _this.props.data };
        _this.startTime = _this.state.startTime;
        _this.currentTime = _this.startTime;
        var scenario = new _Scenario2.default(_this.startTime);
        for (var _iterator = _this.state.data.scenes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var data = _ref;

            scenario.add(new _Scene2.default(data));
        }
        return _this;
    }

    Timeline.prototype.checker = function checker() {
        requestAnimationFrame(this.checker);
        this.scenario.check(timer);
    };

    Timeline.prototype.setScenario = function setScenario(scenario) {};

    Timeline.prototype.clearSenario = function clearSenario() {};

    Timeline.prototype.addSceneToGroup = function addSceneToGroup(group, scene) {};

    Timeline.prototype.removeScene = function removeScene(scene) {};

    Timeline.prototype.seekTo = function seekTo(time) {
        this.currentTime = this.startTime + time;
    };

    Timeline.prototype.render = function render() {
        var startTime = this.props.startTime;

        /**
         * Display the timline
         */

        return this.props.data.forEach(function (data) {
            console.log(data);
        });
    };

    return Timeline;
}(_react.Component);

exports.default = Timeline;