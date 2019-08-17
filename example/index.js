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
                {start: 0, end: 15, type: "slider", data: {a: 1, b: 2}},
                {start: 0, end: 15, type: "title", data: {a: 1, b: 2}},
                {start: 15, end: 50, type: "title", data: {}},
                {start: 15, end: 30, type: "slider", data: {}},
                {start: 30, end: 50, type: "slider", data: {}},
                {start: 5, end: 45, type: "chat", data: {}},
                {start: 45, end: 70, type: "chat", data: {}},
                {start: 0, end: 30, type: "survey", data: {}},
                {start: 30, end: 60, type: "survey", data: {}},
            ]
        };

        this.state = {
            currentTime: 0,
            json: json
        };

        this.state.currentTime = 15;
        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
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
        console.log(data);
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
        var scene = {start: last.end, end: last.end+10, type: randType, data: {"random":true}};
        this.state.json.scenes.push(scene);
        this.setState({ state: this.state });
    }

    render()
    {
        return (
            <div>
                <div>
                    <button onClick={this.addEvent}>Add event</button>
                    <button onClick={this.removeEvent}>Remove last event</button>
                    <button>Play</button>
                    <button>Pause</button>
                    <button>Stop</button>
                    <button>Back to zero</button>
                </div>
                <br/>
                <div>
                    <Timeline data={this.state.json} scene_callback={this.callback} currentTime={this.state.currentTime} />
                </div>
            </div>
        );
    }
}

render(
<Example/>,
    node
);
