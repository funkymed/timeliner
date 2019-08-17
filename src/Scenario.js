import Scene from './Scene'

export default class Scenario {
    constructor(startTime) {
        this.params = {
            offset: -1,
            timer: 0,
            startTime: startTime,
            currentTime: startTime,
            endTime: startTime
        };
        this.scenes= [];
    }

    removeScene(sceneToDelete) {
        var index = this.scenes.indexOf(sceneToDelete);
        if (index > -1) {
            this.scenes.splice(index, 1);
        }
    }

    check(timer) {
        this.params.timer = timer;
        for(const scene in this.scenes){
            if (timer >= scene.start && (scene.end && timer < scene.end) && scene.enabled) {
                scene.callback(scene);
            }
        }
    };
    updateEndTime(time) {
        this.params.endTime=time;
    }

    seekTo(time) {
        this.params.currentTime = time;
        this.check(time);
    }

    getType() {
        return this.data.type;
    }

    add(scene) {
        const s = new Scene(scene);
        this.scenes.push(s);
        return s;
    }
}
