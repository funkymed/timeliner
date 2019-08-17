import React, {Component, PropTypes} from 'react'
import Scenario from './Scenario'
import Moment from 'react-moment';
import 'moment-timezone';
import * as moment from 'moment';
import Scene from './Scene'

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.data};
        this.startTime = this.state.startTime;
        this.currentTime = this.startTime;
        var scenario = new Scenario(this.startTime);
        for (const data of this.state.data.scenes) {
            scenario.add(new Scene(data));
        }
    }

    checker() {
        requestAnimationFrame(this.checker);
        this.scenario.check(timer);
    }

    setScenario(scenario) {
    }

    clearSenario() {
    }

    addSceneToGroup(group, scene) {
    }

    removeScene(scene) {
    }

    seekTo(time) {
        this.currentTime = this.startTime + time;
    }

    render() {
        const {
            startTime
        } = this.props;

        /**
         * Display the timline
         */
        return (
            this.props.data.forEach(function (data) {
                console.log(data);
            })
        );
    }
}

