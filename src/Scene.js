import Timeline from "./Timeline";
import Type from './Type';

export default class Scene {
    constructor(params) {
        this.params = {
            ...params,
            id: this.generateUid(),
            enabled: true,
        };
        if (this.params.callback) {
            this.callback = this.params.callback;
        }
    }

    getType() {
        return this.params.type ? this.params.type : TypeDefault;
    }

    enable(enabled) {
        this.params.enabled = enabled;
    }

    getName() {
        return this.name = name ? name : this.id;
    }

    generateUid(separator) {
        var delim = separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    }

    /**
     * use Callback to fireevent when the timeline hit the start time
     */
    callback() {
    };
}
