'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scenario = require('./Scenario');

var _Scenario2 = _interopRequireDefault(_Scenario);

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = function (_Component) {
    _inherits(Timeline, _Component);

    function Timeline(props) {
        _classCallCheck(this, Timeline);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = { date: new Date() };
        var timelineScenes = [];
        _this.props.data.forEach(function (data) {
            timelineScenes.push(new _Scene2.default(data));
        });
        return _this;
    }

    Timeline.prototype.componentDidMount = function componentDidMount() {};

    Timeline.prototype.componentWillUnmount = function componentWillUnmount() {};

    Timeline.prototype.setScenario = function setScenario(scenario) {};

    Timeline.prototype.clearSenario = function clearSenario() {};

    Timeline.prototype.addSceneToGroup = function addSceneToGroup(group, scene) {};

    Timeline.prototype.removeScene = function removeScene(scene) {};

    Timeline.prototype.seekTo = function seekTo(time) {};

    Timeline.prototype.render = function render() {
        var scenario = this.props.scenario;

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