import uniqueHash from "unique-hash"
import Tools from './Tools'

export default class Scene {
    constructor(params) {
        this.params = params;
        this.params.enabled = this.params.enabled ? this.params.enabled : true;
        this.params.timecode = Tools.hhmmss(this.params.start);
        this.data = this.params.data ? this.params.data : {};
        this.passed = false;
        if (this.params.data) {
            delete this.params.data;
        }
        if (this.params.callback) {
            this.callback = this.params.callback;
            delete this.params.callback;
        }
        this.hash = uniqueHash(this.params.start);
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
