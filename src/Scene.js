import Tools from './Tools'

export default class Scene {
    constructor(params) {
        this.params = params;
        this.params.enabled = this.params.enabled ? this.params.enabled : true;
        this.params.timecode = Tools.hhmmss(this.params.start);
        if(!this.params.data){
            this.params.data = {};
        }

        if (this.params.callback) {
            this.callback = this.params.callback;
            delete this.params.callback;
        }
        this.hash = Tools.getHash([this.params.start,this.params.type,this.params.end].join("-"));
    }

    getType() {
        return this.params.type ? this.params.type : "default";
    }

    getEnd(){
        return this.params.end;
    }

    enable(enabled) {
        this.params.enabled = enabled;
    }

    getName() {
        return this.name = name ? name : this.id;
    }

    callback(scene) {
    };
}
