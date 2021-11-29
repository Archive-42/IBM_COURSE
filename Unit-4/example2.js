
'use strict'
console.log(Date.now().toString() + ': mainline: BEGIN');
setTimeout(() => {
    // Log a message coming from the event loop (from which this code is initiated)
    console.log(Date.now().toString() + ':event loop (callback): Asynchronous processing complete.');
}, 20);
console.log(Date.now().toString() + ':mainline: END');
