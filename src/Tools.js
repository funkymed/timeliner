import uniqueHash from "unique-hash"

export default class Tools {
    static hhmmss(secs) {
        var minutes = Math.floor(secs / 60);
        secs = secs%60;
        var hours = Math.floor(minutes/60)
        minutes = minutes%60;
        return `${Tools.pad(hours)}:${Tools.pad(minutes)}:${Tools.pad(secs)}`;
        // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
    }

    static pad(num) {
        return ("0"+num).slice(-2);
    }

    static generateUid(separator) {
        var delim = separator || "-";
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    }
}
