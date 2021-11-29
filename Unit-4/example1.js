
'use strict'
console.log(Date.now().toString() + ': mainline: BEGIN');
// Burn CPU time
const startTime = Date.now();
let endTime = startTime;
// Chew up some CPU until 20ms has elapsed
while (endTime < startTime + 20) {
    endTime = Date.now();
}
console.log(Date.now().toString() + ': mainline: END');
