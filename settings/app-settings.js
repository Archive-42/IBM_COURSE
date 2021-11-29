
const common = {
    dataDirectory : '../data'
};

const fileNames = {
    _50Words : common.dataDirectory + '/50kWords.txt',
    _1kWords : common.dataDirectory + '/1kWords.txt',
    _10kWords : common.dataDirectory + '/10kWords.txt',
    _100kWords : common.dataDirectory + '/100kWords.txt',
    _1mWords : common.dataDirectory + '/1mWords.txt',
    _10mWords : common.dataDirectory + '/10mWords.txt',
};

const example9 = {
    inputFileName : common.dataDirectory + '/10kWords.txt',
    outputFileName : common.dataDirectory + '/10kWords.txt.out'
};

const example10 = {
    inputFileName : common.dataDirectory + '/10kWords.txt'
};

module.exports.common = common;
module.exports.example9 = example9;
module.exports.example10 = example10;
module.exports.fileNames = fileNames;
