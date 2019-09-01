import Scene from './Scene'

export default class Scenario {
    constructor(startTime) {
        this.params = {
            timer: startTime,
            startTime: startTime,
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
        for(const b in this.scenes){
            var scene = this.scenes[b];
            if (timer >= scene.params.start && timer < scene.params.start + 1 && scene.params.enabled) {
                var data = {
                    ...scene,
                    label: 'start_callback'
                };
                scene.callback(data);
            }
        }
    }

    updateEndTime(time) {
        console.log(time)
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
