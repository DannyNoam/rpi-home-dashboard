import {pollFor} from '../../../src/util/pollUtils.js';
import {chai, expect, sinon} from '../../util/testUtils';

describe('Given the pollUtils utility file', () => {
  describe('when pollFor is called with a given action and time value', function () {
    let action,
      clock,
      pollTime = 5000;
    
    beforeEach(() => {
      action = sinon.spy();
      clock = sinon.useFakeTimers();
      pollFor(action, pollTime);
    });
    
    afterEach(() => {
      clock.restore();
    });
    
    it('should invoke the given action', () => {
      expect(action).to.have.been.calledOnce;
    });
    
    describe('when the given poll time has passed', () => {
      it('should invoke the given action again', () => {
        clock.tick(pollTime);
    
        expect(action).to.have.been.calledTwice;
      });
    });
  });
});
