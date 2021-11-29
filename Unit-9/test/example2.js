
const {describe, it} = require('mocha');
const {expect} = require('chai');

describe('Simple test suite (with chai):', function() {
    it('1 === 1 should be true', function() {
        expect(1 === 1).to.be.true;
    });
});
