
// Begin
var fs = require('fs');
console.log('Starting program...');
// Read a small file asynchronously
fs.readFile('../data/50Words.txt', 'utf8', function(err, fileContents) {
    // If error occurred, rethrow error
    if (err) throw err;
    // Count number of words
    let numberOfWords = fileContents.split(/[ ,.\n]+/).length;
    // Print to console
    console.log('There are ' + numberOfWords + ' words in this file.');
});
console.log('Program finished');
