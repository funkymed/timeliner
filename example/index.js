import {Timeline} from '../dist/index'
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
    }

    render()
    {
        //const {modal} = this.state;

        return (
            <div>
                <Timeline/>
            </div>
    );
    }
}

render(
<Example/>,
    node
);
