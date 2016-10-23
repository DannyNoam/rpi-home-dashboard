let chai = require('chai');
let sinon = require('sinon');
let sinonChai = require('sinon-chai');

chai.use(sinonChai);

let testUtils = {
  'chai': chai,
  'expect': chai.expect,
  'sinon': sinon
};

module.exports = testUtils;
