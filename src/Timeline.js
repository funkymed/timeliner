import React, {Component, PropTypes} from 'react'
import Scenario from './Scenario'
import Scene from './Scene'

export default class Timeline extends Component
{
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        var timelineScenes = [];
        this.props.data.forEach(function(data)
        {
            timelineScenes.push(new Scene(data));
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    setScenario (scenario: Scenario) {
    }

    clearSenario() {
    }

    addSceneToGroup(group: Group, scene: Scene) {
    }

    removeScene(scene: Scene) {
    }

    seekTo (time) {
    }

    render()
    {
        const {
            scenario
        } = this.props;

        /**
         * Display the timline
         */
        return (
            this.props.data.forEach(function(data)
            {
                console.log(data);
            })
        );
    }
}

