
'use strict'

/**
 * Chews up a little CPU, mostly used for
 * event loop mapping (to make sure timers are
 * expired before letting the event loop continue, 
 * for example)
 * 
 * @param millisToEat - the number of milliseconds
 * to chew up before returning.
 */
function eatCpu(millisToEat) {
    let then = Date.now();
    let now = then;
    while (now < then + millisToEat) {
        now = Date.now();
    }
}

/**
 * Take an hrtime from process.hrtime()
 * and convert it to milliseconds.
 * 
 * @param hrtime - the hrtime value from a prior call
 * to process.hrtime()
 */
function hrtimeToMillis(hrtime) {
    // 1. Convert seconds to nanoseconds
    // 2. Add nanoseconds
    // 3. Convert to milliseconds
    return (
        /*1*/ hrtime[0] * 1e9 
        /*2*/ + hrtime[1] ) 
        /*3*/ / 1e6;
}

module.exports.eatCpu = eatCpu;
module.exports.hrtimeToMillis = hrtimeToMillis;
