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
            scenes: this.props.data.scenes ? this.props.data.scenes : [],
            endTime: this.props.data.startTime ? this.props.data.startTime : 0,
            options: this.props.data.options ? this.props.data.options : false,
            rendering: this.props.rendering ? this.props.rendering : false
        };
        this.callback = this.props.scene_callback ? this.props.scene_callback : false;
        this.editcallback = this.props.editcallback ? this.props.editcallback : false;
        this.getLastEventFromCurrentTime = this.getLastEventFromCurrentTime.bind(this);
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

    getLastEventFromCurrentTime(time){
        const _time = time ? time : this.state.currentTime;
        let lastCallBack={};
        for (const group in this.timelineItems){
            lastCallBack[group]=false;
            for (let tt = 0; tt < this.timelineItems[group].length; tt++) {
                if(this.timelineItems[group][tt].start<=_time){
                    lastCallBack[group]=this.timelineItems[group][tt];
                }
            }
        }
        return lastCallBack;
    }

    componentDidMount() {

        if(this.props.data.scenes.length<=0){
            return;
        }

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
        itemName.appendChild(document.createTextNode(`${Tools.hhmmss(displayTime)}`));
        itemName.style.height = (blockH - 6) + "px";
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

        for (var tt = 0; tt <= this.state.endTime; tt += Math.ceil(this.state.endTime/10)) {
            var item = d.createElement('div');

            item.appendChild(document.createTextNode(Tools.hhmmss(tt)));
            item.style.paddingTop = "6px";
            item.style.borderLeft = "1px white solid";
            item.style.paddingLeft = "10px";
            item.style.display = "inline-block";
            item.style.position = "absolute";
            item.style.height = blockH - 6 + "px";
            item.style.left = blockLeft + (tt / this.state.endTime * blockRight) + "%";
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

                /*color block*/
                if(this.state.options.groupcolors && this.state.options.groupcolors[c]){
                    const colorGroup = this.state.options.groupcolors[c];
                    var color = cc % 2 == 0 ? colorGroup[0] : colorGroup[1];
                }else{
                    var color = cc % 2 == 0 ? "#898989" : "#a0a0a0";
                }

                item.style.display = "inline-block";
                item.style.position = "absolute";
                item.style.paddingTop = "4px";
                item.style.paddingLeft = "4px";
                item.style.overflow = "hidden";
                item.style.textAlign = "left";
                item.style.top = l * blockH + "px";
                item.style.width = ((i.end - i.start) / this.state.endTime * blockRight) + "%";

                item.style.left = (i.start / this.state.endTime * blockRight) + blockLeft + "%";

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
                if(this.endTime<45){
                    item.appendChild(document.createTextNode(Tools.hhmmss(i.start)));
                }

                if(this.editcallback){
                    var itemEvent = circle ? circle : item;
                    for(var dataset in i){
                        if(dataset.indexOf('@')==-1){
                            itemEvent.dataset[dataset] = dataset == "data" ? JSON.stringify(i[dataset]) : i[dataset];
                        }
                    }
                    itemEvent.dataset.hash = Tools.getHash([i.start,i.type,i.end].join("-"));
                    itemEvent.dataset.timecode = Tools.hhmmss(i.start);

                    itemEvent.addEventListener('click',this.editcallback);
                    itemEvent.addEventListener('mouseover',this.editcallback);
                    itemEvent.addEventListener('mouseout',this.editcallback);
                }

                itemDuration.appendChild(item);

                cc++;
                circle = false;
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

        var timer = this.props.currentTime>=this.state.endTime ? this.state.endTime : this.props.currentTime;

        var cursorOfsset = ((timer/this.state.endTime)*blockRight)+blockLeft;
        /*if(cursorOfsset>blockRight){
            cursorOfsset=blockRight;
        }*/
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

        this.scenario = new Scenario(this.state.startTime);
        this.timelineItems=[];
        this.state.endTime=this.state.startTime;
        var scenes = this.props.data.scenes;
        if(scenes.length>0){
            scenes.sort(this.dynamicSort("type"));
            for (const data of scenes) {
                //data.end = data.end ? data.end : data.start+5;
                if(data.start<=0){
                    data.start=1;
                }
                if (this.callback) {
                    data.callback = this.callback;
                }
                const scene = this.scenario.add(data);
                if(!this.timelineItems[scene.getType()]){
                    this.timelineItems[scene.getType()]=[];
                }

                this.timelineItems[scene.getType()].push(data);
                if (data.start >= this.state.endTime) {
                    this.state.endTime = data.start;
                }
            }

            this.state.endTime+=this.state.endTime*10/100;
            this.scenario.updateEndTime(this.state.endTime);

            if(this.props.isplaying){
                this.scenario.check(this.props.currentTime);
            }
        }
        return (
          <div id="funkymed-timeline"></div>
        )
    }
}

