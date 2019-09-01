import uniqueHash from "unique-hash"

/**
 * Tools with static transverse functions
 */
export default class Tools {
    static hhmmss(sec){
        let o = new Date(0)
        o.setSeconds(sec);
        let p =  new Date(sec*1000)
        return o.toISOString().substr(11, 8)+ "." + p.getMilliseconds();
    }

    static getHash(data){
        return uniqueHash(data);
    }

    static generateUid(separator) {
        var delim = separator || "-";
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    }
}
