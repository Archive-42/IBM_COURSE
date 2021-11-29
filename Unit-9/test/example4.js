
const {describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');

describe('When stubbing console.log()', function() {
    it('console.log() is replaced and the stub is called instead', function() {
        let consoleLogStub = sinon.stub(console, 'log');
        let message = 'You will NOT see this line of output in the test report';
        console.log(message);
        consoleLogStub.restore();
        expect(consoleLogStub.calledWith(message)).to.be.true;
    });
});
