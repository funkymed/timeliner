'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Scenario = require('./Scenario');

var _Scenario2 = _interopRequireDefault(_Scenario);

var _Tools = require('./Tools');

var _Tools2 = _interopRequireDefault(_Tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = function (_Component) {
    _inherits(Timeline, _Component);

    function Timeline(props) {
        _classCallCheck(this, Timeline);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            currentTime: _this.props.currentTime ? _this.props.currentTime : 0,
            isplaying: _this.props.isplaying ? _this.props.isplaying : false,
            startTime: _this.props.data.startTime,
            scenes: _this.props.data.scenes,
            endTime: _this.props.data.startTime,
            options: _this.props.data.options ? _this.props.data.options : false,
            rendering: _this.props.rendering ? _this.props.rendering : false
        };
        _this.callback = _this.props.scene_callback ? _this.props.scene_callback : false;
        _this.editcallback = _this.props.editcallback ? _this.props.editcallback : false;
        return _this;
    }

    Timeline.prototype.setScenes = function setScenes(scenes) {
        this.state.scenes = scenes;
    };

    Timeline.prototype.clearSenario = function clearSenario() {};

    Timeline.prototype.addScene = function addScene(data) {
        if (this.callback) {
            data.callback = this.callback;
        }
        this.state.scenes.push(data);
        this.scenario.add(data);
    };

    Timeline.prototype.removeScene = function removeScene(scene) {};

    Timeline.prototype.seekTo = function seekTo(time) {
        this.state.currentTime = this.startTime + time;
    };

    /**
     * Function to sort alphabetically an array of objects by some specific key.
     *
     * @param {String} property Key of the object to sort.
     */


    Timeline.prototype.dynamicSort = function dynamicSort(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a, b) {
            if (sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        };
    };

    Timeline.prototype.componentDidMount = function componentDidMount() {
        var d = document;
        var containerTimeline = d.createElement('div');
        containerTimeline.style.width = "100%";
        containerTimeline.style.position = "relative";
        containerTimeline.style.bottom = "0";
        containerTimeline.style.height = "auto";
        containerTimeline.style.fontFamily = "Helvetica";
        containerTimeline.style.fontSize = ".75em";

        var blockH = 30;
        var blockLeft = 10;
        var blockRight = 100 - blockLeft;
        var blockName = d.createElement('div');
        blockName.style.background = "gray";
        blockName.style.width = blockLeft + "%";
        blockName.style.float = "left";
        containerTimeline.appendChild(blockName);

        var blockDuration = d.createElement('div');
        blockDuration.style.background = "gray";
        blockDuration.style.width = blockRight + "%";
        blockDuration.style.float = "left";
        containerTimeline.appendChild(blockDuration);

        var itemName = d.createElement('div');

        var displayTime = this.props.currentTime >= this.state.endTime ? this.state.endTime : this.props.currentTime;
        itemName.appendChild(document.createTextNode('' + _Tools2.default.hhmmss(displayTime)));
        itemName.style.height = blockH - 6 + "px";
        itemName.style.paddingTop = "6px";
        itemName.style.textAlign = "left";
        itemName.style.paddingLeft = "10px";
        itemName.style.background = "#333";
        itemName.style.color = "white";
        blockName.appendChild(itemName);

        var itemDuration = d.createElement('div');
        itemDuration.style.height = blockH + "px";
        itemDuration.style.background = "#555";
        itemDuration.style.color = "white";
        blockDuration.appendChild(itemDuration);

        for (var tt = 0; tt <= this.state.endTime; tt += Math.ceil(this.state.endTime / 10)) {
            var item = d.createElement('div');

            item.appendChild(document.createTextNode(_Tools2.default.hhmmss(tt)));
            item.style.paddingTop = "6px";
            item.style.borderLeft = "1px white solid";
            item.style.paddingLeft = "10px";
            item.style.display = "inline-block";
            item.style.position = "absolute";
            item.style.height = blockH - 6 + "px";
            item.style.left = blockLeft + tt / this.state.endTime * blockRight + "%";
            item.style.top = l * blockH - 2 + "px";
            item.style.textAlign = "let";
            itemDuration.appendChild(item);
        }

        var l = 1;
        for (var c in this.timelineItems) {
            var itemName = d.createElement('div');
            itemName.style.paddingTop = "4px";
            itemName.style.paddingLeft = "4px";
            itemName.appendChild(document.createTextNode(c));
            itemName.style.height = blockH - 4 + "px";
            itemName.style.background = l % 2 == 0 ? "#eaedea" : "#f2f4f2";
            blockName.appendChild(itemName);

            var itemDuration = d.createElement('div');
            itemDuration.style.background = l % 2 == 0 ? "#f2f4f2" : "#eaedea";
            itemDuration.style.height = blockH + "px";

            blockDuration.appendChild(itemDuration);
            var cc = 0;
            for (var _iterator = this.timelineItems[c], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var i = _ref;


                var item = d.createElement('div');

                /*color block*/
                if (this.state.options.groupcolors && this.state.options.groupcolors[c]) {
                    var colorGroup = this.state.options.groupcolors[c];
                    var color = cc % 2 == 0 ? colorGroup[0] : colorGroup[1];
                } else {
                    var color = cc % 2 == 0 ? "#898989" : "#a0a0a0";
                }

                item.style.display = "inline-block";
                item.style.position = "absolute";
                item.style.paddingTop = "4px";
                item.style.paddingLeft = "4px";
                item.style.overflow = "hidden";
                item.style.textAlign = "left";
                item.style.top = l * blockH + "px";
                item.style.width = (i.end - i.start) / this.state.endTime * blockRight + "%";

                item.style.left = i.start / this.state.endTime * blockRight + blockLeft + "%";

                /*if(i.end){
                    item.style.background = color;
                    item.style.height = blockH - 4 + "px";
                }else{*/
                item.style.marginTop = "4px";

                var circle = d.createElement('div');
                circle.style.borderRadius = "50%";
                circle.style.width = blockH / 2 + "px";
                circle.style.height = blockH / 2 + "px";
                circle.style.background = color;
                circle.style.float = "left";
                circle.style.marginRight = "5px";
                item.appendChild(circle);
                //}
                if (this.endTime < 45) {
                    item.appendChild(document.createTextNode(_Tools2.default.hhmmss(i.start)));
                }

                if (this.editcallback) {
                    var itemEvent = circle ? circle : item;
                    for (var dataset in i) {
                        itemEvent.dataset[dataset] = i[dataset];
                    }
                    itemEvent.dataset.hash = _Tools2.default.getHash([i.start, i.type, i.end].join("-"));
                    itemEvent.dataset.timecode = _Tools2.default.hhmmss(i.start);

                    itemEvent.addEventListener('click', this.editcallback);
                    itemEvent.addEventListener('mouseover', this.editcallback);
                    itemEvent.addEventListener('mouseout', this.editcallback);
                }

                itemDuration.appendChild(item);

                cc++;
                circle = false;
            }
            l++;
        }

        var cursorTimeline = d.createElement('div');
        cursorTimeline.style.zIndex = 100;
        cursorTimeline.style.height = blockH * l + "px";
        cursorTimeline.style.background = "red";
        cursorTimeline.style.width = "2px";
        cursorTimeline.style.position = "relative";
        cursorTimeline.style.bottom = 0;
        containerTimeline.appendChild(cursorTimeline);
        blockDuration.style.height = blockH * l + "px";

        var timer = this.props.currentTime >= this.state.endTime ? this.state.endTime : this.props.currentTime;

        var cursorOfsset = timer / this.state.endTime * blockRight + blockLeft;
        /*if(cursorOfsset>blockRight){
            cursorOfsset=blockRight;
        }*/
        cursorTimeline.style.left = cursorOfsset + "%";

        if (this.props.rendering) {
            var container = document.getElementById("funkymed-timeline");
            container.appendChild(containerTimeline);
        }
    };

    Timeline.prototype.componentDidUpdate = function componentDidUpdate() {
        var container = document.getElementById("funkymed-timeline");
        container.innerHTML = "";
        if (this.props.rendering) {
            this.componentDidMount();
        }
    };

    Timeline.prototype.render = function render() {
        var startTime = this.props.startTime;


        this.scenario = new _Scenario2.default(this.state.startTime);
        this.timelineItems = [];
        this.state.endTime = this.state.startTime;
        var scenes = this.props.data.scenes;
        scenes.sort(this.dynamicSort("type"));
        for (var _iterator2 = scenes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var data = _ref2;

            //data.end = data.end ? data.end : data.start+5;
            if (this.callback) {
                data.callback = this.callback;
            }
            var scene = this.scenario.add(data);

            if (!this.timelineItems[scene.getType()]) {
                this.timelineItems[scene.getType()] = [];
            }

            this.timelineItems[scene.getType()].push(data);
            console.log(data.start, data.start >= this.state.endTime);
            if (data.start >= this.state.endTime) {
                this.state.endTime = data.start;
            }
        }
        this.state.endTime += this.state.endTime * 10 / 100;
        this.scenario.updateEndTime(this.state.endTime);

        if (this.props.isplaying) {
            this.scenario.check(this.props.currentTime);
        }

        return _react2.default.createElement('div', { id: 'funkymed-timeline' });
    };

    return Timeline;
}(_react.Component);

exports.default = Timeline;