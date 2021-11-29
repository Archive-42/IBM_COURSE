
'use strict'
const fs = require('fs');
(function mainline() {
    process.nextTick(() => {
        console.log('Giedi Prime');
    });
    console.log('Ix');
    setTimeout(() => {
        console.log('Chapterhouse');
    });
    setImmediate(() => {
        console.log('Tleilax');
    });
    fs.readdir('./', 'utf8', (err, files) => {
        console.log('Caladan');
        setTimeout(() => {
            console.log('Arrakis');
        }, 0);
        setImmediate(() => {
            console.log('Kaitain');
        });
        process.nextTick(() => {
            console.log('Salusa Secundus');
        });
    });
    console.log('Corrin');
})();

