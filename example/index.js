import {Timeline}  from '../dist/index'
import React, {Component} from 'react'
import {render} from 'react-dom'

let node = document.getElementById('app');

class Example extends Component
{

    constructor()
    {
        super();

        const json = {
            startTime: '0',
            options: {
                groupcolors: {
                    "slider": ["#ffae32", "#ffc266"],
                    "title": ["#6f9dff", "#8fb3ff"],
                    "chat": ["#fe6fff", "#fe8fff"],
                    "survey": ["#30c84a", "#3dfb5d"],
                }
            },
            scenes: [
                {start: 2, type: "chat", data: {}},
                {start: 5, type: "survey", data: {}},
                {start: 10, type: "slider", data: {}},
                {start: 15, type: "slider", data: {}},
                {start: 20, type: "chat", data: {}},
                {start: 30, type: "title", data: {}},
                {start: 33, type: "chat", data: {}},
                {start: 35, type: "slider", data: {}},
            ]
        };
        this.fired = [];
        this.state = {
            currentTime: 0,
            dateStart: false,
            isplaying: false,
            json: json,
            rendering : true
        };

        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
        this.callback = this.callback.bind(this);
        this.editcallback = this.editcallback.bind(this);
        this.togglerendering = this.togglerendering.bind(this);
    }

    getSortOrder(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    editcallback(e){
        var content = "";
        content+= `type : ${e.type}<br/>`;
        content+= `data : ${JSON.stringify(e.target.dataset)}`;
        document.getElementById("event-scene").innerHTML=content;
    }

    callback(data){
        if(!this.fired[data.hash]){
            var callBackTime = (new Date().getTime()-this.dateStart)/1000;
            document.getElementById("actual-scene").innerHTML=JSON.stringify(data);
        }
    }

    togglerendering(){
        this.state.rendering = !this.state.rendering;
        this.setState({ state: this.state });
    }

    removeEvent(){
        this.state.json.scenes.sort(this.getSortOrder("start"));
        this.state.json.scenes.reverse().shift();
        this.setState({ state: this.state });
    }

    addEvent(){
        this.state.json.scenes.sort(this.getSortOrder("start"));

        var types = ["survey","title","chat","slider"];
        var randType = types[Math.floor(Math.random()*types.length)];
        const last = this.state.json.scenes.reverse()[0];

        var scene = {start: last.start+5, end:last.start+10, type: randType, data: {"random":true}};
        this.state.json.scenes.push(scene);
        this.setState({ state: this.state });
    }

    componentDidMount() {
        this.updateCurrentTime();
    }

    updateCurrentTime(){
        if(this.state.isplaying && this.state.isplaying && this.dateStart){
            var dateNow = new Date().getTime();
            var currentTime = (dateNow - this.dateStart)/1000;
            this.setState({ currentTime });
        }
        requestAnimationFrame(this.updateCurrentTime);
    }

    play() {
        this.dateStart = new Date().getTime();
        if (this.state.currentTime) {
            this.dateStart = this.dateStart - this.state.currentTime * 1000;
        }
        this.state.isplaying = true;
        this.setState({state: this.state});
    }

    pause(){
        this.state.isplaying = false;
        this.setState({ state: this.state });
    }

    stop(){
        this.state.isplaying = false;
        this.dateStart = false;
        this.state.currentTime = 0;
        this.fired=[];
        document.getElementById("actual-scene").innerHTML="";
        this.setState({ state: this.state });
    }

    render()
    {
        return (
            <div>
                <div>
                    <button onClick={this.addEvent}>Add event</button>
                    <button onClick={this.removeEvent}>Remove last event</button>
                    <button onClick={this.play}>Play</button>
                    <button onClick={this.pause}>Pause</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.togglerendering}>Toggle rendering</button>
                </div>
                <br/>
                <div>
                    <Timeline rendering={this.state.rendering} editcallback={this.editcallback} isplaying={this.state.isplaying} data={this.state.json} scene_callback={this.callback} currentTime={this.state.currentTime} />
                </div>
                <div>
                    <h3>Callback</h3>
                    <div id="actual-scene"></div>
                    <h3>Selected</h3>
                    <div id="event-scene"></div>
                </div>
            </div>
        );
    }
}

render(
<Example/>,
    node
);
