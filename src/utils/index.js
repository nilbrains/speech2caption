/**
 * 
 * @param {String} s 
 * @param {*} cb 
 * @returns 
 */
export function formatText(s,cb = () => {}) {
    if (s.indexOf("清空") > -1 || s.toLocaleLowerCase().indexOf("clear") > -1 ) {
        cb("clear")
    }
    return s
}