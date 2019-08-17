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
                {start: 0, end: 60, type: "slider", data: {a: 1, b: 2}},
                {start: 60, end: 120, type: "slider", data: {}},
                {start: 120, end: 180, type: "slider", data: {}},
                {start: 0, end: 60, type: "title", data: {a: 1, b: 2}},
                {start: 60, end: 120, type: "title", data: {}},
                {start: 120, end: 180, type: "chat", data: {}},
                {start: 220, end: 280, type: "chat", data: {}},
                {start: 0, end: 60, type: "survey", data: {}},
                {start: 60, end: 120, type: "survey", data: {}},
            ]
        };
        this.fired = [];
        this.state = {
            currentTime: 0,
            isplaying: false,
            json: json
        };

        this.state.currentTime = 0;
        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
        this.callback = this.callback.bind(this);
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

    callback(data){
        if(!this.fired[data.hash]){
            this.fired[data.hash]=true;
        }
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
        var scene = {start: last.end, end: last.end+120, type: randType, data: {"random":true}};
        this.state.json.scenes.push(scene);
        this.setState({ state: this.state });
    }

    componentDidMount() {
        requestAnimationFrame(this.updateCurrentTime);
    }

    updateCurrentTime(){
        if(this.state.isplaying){
            this.state.currentTime += 1;
            this.setState({ state: this.state });
        }
        requestAnimationFrame(this.updateCurrentTime);
    }

    play(){
        this.state.isplaying = true;
        this.setState({ state: this.state });
    }

    pause(){
        this.state.isplaying = false;
        this.setState({ state: this.state });
    }

    stop(){
        this.state.isplaying = false;
        this.state.currentTime = 0;
        this.fired=[];
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
                </div>
                <br/>
                <div>
                    <Timeline isplaying={this.state.isplaying} data={this.state.json} scene_callback={this.callback} currentTime={this.state.currentTime} />
                </div>
            </div>
        );
    }
}

render(
<Example/>,
    node
);
