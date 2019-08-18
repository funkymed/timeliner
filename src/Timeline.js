import React, {Component, PropTypes} from 'react'
import Scenario from './Scenario'
import Tools from './Tools'

export default class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: this.props.currentTime ? this.props.currentTime : 0,
            isplaying: this.props.isplaying ? this.props.isplaying : false,
            startTime: this.props.data.startTime,
            scenes: this.props.data.scenes,
            endTime: this.props.data.startTime,
            options: this.props.data.options ? this.props.data.options : false,
            rendering: this.props.rendering ? this.props.rendering : false
        };
        this.callback = this.props.scene_callback ? this.props.scene_callback : false;
        this.editcallback = this.props.editcallback ? this.props.editcallback : false;
    }


    setScenes(scenes) {
        this.state.scenes = scenes;
    }

    clearSenario() {
    }

    addScene(data) {
        if (this.callback) {
            data.callback = this.callback;
        }
        this.state.scenes.push(data);
        this.scenario.add(data);
    }

    removeScene(scene) {
    }

    seekTo(time) {
        this.state.currentTime = this.startTime + time;
    }

    /**
     * Function to sort alphabetically an array of objects by some specific key.
     *
     * @param {String} property Key of the object to sort.
     */
    dynamicSort(property) {
        var sortOrder = 1;

        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a,b) {
            if(sortOrder == -1){
                return b[property].localeCompare(a[property]);
            }else{
                return a[property].localeCompare(b[property]);
            }
        }
    }

    componentDidMount() {
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

        itemName.appendChild(document.createTextNode(`Timecode : ${Tools.hhmmss(displayTime)}`));
        itemName.style.height = (blockH - 4) + "px";
        itemName.style.paddingTop = "4px";
        itemName.style.paddingLeft = "4px";
        itemName.style.background = "#333";
        itemName.style.color = "white";
        blockName.appendChild(itemName);

        var itemDuration = d.createElement('div');
        itemDuration.style.height = blockH + "px";
        itemDuration.style.background = "#555";
        itemDuration.style.color = "white";
        blockDuration.appendChild(itemDuration);
        /*
            itemDuration.addEventListener('click', function(e) {
              var scrW = w.innerWidth || e.clientWidth || g.clientWidth;
              var seekTime = e.offsetX/(scrW*blockRight/100)*end;
              s.seekTo(seekTime);
            });
        */


        //175 = this.state.endTime = 5
        for (var tt = 0; tt <= this.state.endTime; tt += Math.ceil(this.state.endTime/10)) {
            var item = d.createElement('div');

            item.appendChild(document.createTextNode("| " + Tools.hhmmss(tt)));
            item.style.paddingTop = "4px";
            item.style.paddingLeft = "4px";
            item.style.display = "inline-block";
            item.style.position = "absolute";
            item.style.height = blockH - 4 + "px";
            item.style.left = (tt / this.state.endTime * blockRight) + blockLeft + "%";
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
            itemName.style.background = (l % 2 == 0) ? "#eaedea" : "#f2f4f2";
            blockName.appendChild(itemName);

            var itemDuration = d.createElement('div');
            itemDuration.style.background = (l % 2 == 0) ? "#f2f4f2" : "#eaedea";
            itemDuration.style.height = blockH + "px";

            blockDuration.appendChild(itemDuration);
            var cc = 0;
            for (const i of this.timelineItems[c]) {

                var item = d.createElement('div');
                item.appendChild(document.createTextNode(Tools.hhmmss(i.start)));

                /*color block*/
                if(this.state.options.groupcolors && this.state.options.groupcolors[c]){
                    const colorGroup = this.state.options.groupcolors[c];
                    var color = cc % 2 == 0 ? colorGroup[0] : colorGroup[1];
                }else{
                    var color = cc % 2 == 0 ? "#898989" : "#a0a0a0";
                }

                item.style.background = color;
                item.style.display = "inline-block";
                item.style.position = "absolute";
                item.style.height = blockH + "px";
                item.style.paddingTop = "4px";
                item.style.paddingLeft = "4px";
                item.style.height = blockH - 4 + "px";
                item.style.overflow = "hidden";

                item.style.left = (i.start / this.state.endTime * blockRight) + blockLeft + "%";
                item.style.top = l * blockH + "px";
                item.style.width = ((i.end - i.start) / this.state.endTime * blockRight) + "%";

                item.style.textAlign = "left";

                if(this.editcallback){
                    for(var dataset in i){
                        item.dataset[dataset] = i[dataset];
                    }
                    item.dataset.hash = Tools.getHash([i.start,i.type,i.end].join("-"));
                    item.dataset.timecode = Tools.hhmmss(i.start);

                    item.addEventListener('click',this.editcallback);
                    item.addEventListener('mouseover',this.editcallback);
                    item.addEventListener('mouseout',this.editcallback);
                }

                itemDuration.appendChild(item);

                cc++;
            }
            l++;
        }
        const cursorTimeline = d.createElement('div');
        cursorTimeline.style.zIndex=100;
        cursorTimeline.style.height=blockH*l+"px";
        cursorTimeline.style.background="red";
        cursorTimeline.style.width="2px";
        cursorTimeline.style.position="relative";
        cursorTimeline.style.bottom=0;
        containerTimeline.appendChild(cursorTimeline);
        blockDuration.style.height=blockH*l+"px";

        var timer = this.props.currentTime>this.state.endTime ? this.state.endTime : this.props.currentTime;

        var cursorOfsset = ((timer/this.state.endTime)*90)+10;
        cursorTimeline.style.left = cursorOfsset+"%";

        if(this.props.rendering){
            const container = document.getElementById("funkymed-timeline");
            container.appendChild(containerTimeline);
        }
    }

    componentDidUpdate() {
        const container = document.getElementById("funkymed-timeline");
        container.innerHTML="";
        if(this.props.rendering){
            this.componentDidMount();
        }
    }

    render() {

        const {
            startTime
        } = this.props;

        this.scenario = new Scenario(this.state.startTime);
        this.timelineItems=[];
        this.state.endTime=this.state.startTime;
        var scenes = this.props.data.scenes;
        scenes.sort(this.dynamicSort("type"));
        for (const data of scenes) {
            data.end = data.end ? data.end : data.start+5;
            if (this.callback) {
                data.callback = this.callback;
            }
            const scene = this.scenario.add(data);

            if(!this.timelineItems[scene.getType()]){
                this.timelineItems[scene.getType()]=[];
            }

            this.timelineItems[scene.getType()].push(data);

            if(data.end>this.state.endTime){
                this.state.endTime = data.end;
                this.scenario.updateEndTime(this.state.endTime);
            }
        }

        if(this.props.isplaying){
            this.scenario.check(this.props.currentTime);
        }

        return (
            <div id="funkymed-timeline"></div>
        )
    }
}

