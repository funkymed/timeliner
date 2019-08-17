import Scene from './Scene'

export default class Scenario {
    constructor(params) {
        this.params = {
            ...params,
            offset: -1,
            scenes: [],
            timer: 0,
            startTime: 0,
        };
        this.start(this.params.startTime);
    }

    start(time) {
        this.params.startTime = time;
    }

    removeScene(scene) {
    }

    disableType(type) {
    }

    check(timer) {
        this.params.timer = timer;
        this.params.scenes.forEach(function (scene) {
            if (timer >= scene.start && (scene.end && timer < scene.end) && scene.enabled) {
                scene.callback();
            }
        });
    };

    seekTo(time) {
        //audio.currentTime=time;
        this.params.startTime = time;
        this.check(time);
    }

    addScene(scene) {
        this.params.scenes.push(scene);
    }
}
