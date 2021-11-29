
'use strict'
const fs = require('fs');
(function mainline() {
    process.nextTick(() => {
        console.log('A');
    });
    console.log('B');
    setTimeout(() => {
        console.log('C');
    }, 50);
    setImmediate(() => {
        console.log('D');
    });
    fs.readdir('./', 'utf8', (err, files) => {
        console.log('E');
        setTimeout(() => {
            console.log('F');
        }, 0);
        setImmediate(() => {
            console.log('G');
        });
        process.nextTick(() => {
            console.log('H');
        });
    });
    console.log('I');
})();

