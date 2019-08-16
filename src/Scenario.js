import Scene from './Scene'

export default class Scenario
{
    constructor(){
        this.offset = -1;
        this.scenes = [];
        this.timer=0;
        this.startTime = json.start;
    }

    startTime(time){
        this.startTime = time;
    }

    removeScene(scene: Scene){
    }

    disableType(type){
    }

    check(timer)
    {
      this.timer = timer;
      this.scenes.forEach(function(scene: Scene)
      {
        if(timer>= scene.start && (scene.end && timer< scene.end) && scene.enabled)
        {
            scene.callback();
        }
      });
    };

    seekTo(time)
    {
        //audio.currentTime=time;
        this.startTime=time;
        this.check(time);
    }

    add(scene: Scene)
    {
        this.scenes.push(scene);
    }
}
