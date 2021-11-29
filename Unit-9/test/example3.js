
const {describe, it} = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');

describe('When spying on console.log()', function() {
    it('console.log() should still be called', function() {
        let consoleLogSpy = sinon.spy(console, 'log');
        let message = 'You will see this line of output in the test report';
        console.log(message);
        expect(consoleLogSpy.calledWith(message)).to.be.true;
        consoleLogSpy.restore();
    });
});
