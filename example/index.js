import {Timeline, Type} from '../dist/index'
import React, {Component} from 'react'
import {render} from 'react-dom'

let node = document.getElementById('app');

class Example extends Component
{
    constructor()
    {
        super();
        this.state = {
        };
        this.json = {
            startTime: '2019-08-16 13:00:00',
            scenes: [
                /*Default*/
                {start:0,end:5,type:Type.TypeDefault, data:{}},
                {start:5,end:15,type:Type.TypeDefault, data:{}},
                {start:15,end:25,type:Type.TypeDefault, data:{}},
                /*Slider*/
                {start:2,end:7,type:Type.TypeSlider, data:{}},
            ]
        };
    }

    render()
    {
        //const {modal} = this.state;

        return (
            <div>
                <Timeline data={this.json}/>
            </div>
    );
    }
}

render(
<Example/>,
    node
);
