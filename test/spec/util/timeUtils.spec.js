import {
  calculateMinutesUntilArrival,
  getDigitallyFormattedTime,
  formatTimePart
} from '../../../src/util/timeUtils.js';

import {chai, expect, sinon} from '../../util/testUtils';

describe('Given the timeUtils utility file', () => {
  describe('when calculateMinutesUntilArrival is called', () => {
    let minutesUntilArrival,
      dateStub,
      expected;
    
    beforeEach(() => {
      dateStub = sinon.stub(Date, "now").returns(new Date(Date.UTC(2016, 9, 22, 17, 30, 0, 0)).getTime());
    });
  
    afterEach(() => {
      dateStub.restore();
    });
    
    describe('when the expected time of arrival is in the future', () => {
      beforeEach(() => {
        let timeOfArrivalData = "2016-10-22T17:35:00.402431Z";
        expected = 5;
        minutesUntilArrival = calculateMinutesUntilArrival(timeOfArrivalData);
      });
      
      it('should return the correct number of minutes until arrival', () => {
        expect(minutesUntilArrival).to.equal(expected);
      });
    });
  
    describe('when the expected time of arrival is in the past', () => {
      beforeEach(() => {
        let timeOfArrivalData = "2016-10-22T17:29:00.402431Z";
        expected = 0;
        minutesUntilArrival = calculateMinutesUntilArrival(timeOfArrivalData);
      });
    
      it('should return 0 to indicate an imminent arrival', () => {
        expect(minutesUntilArrival).to.equal(expected);
      });
    });

  });
  
  describe('when getDigitallyFormattedTime is called', () => {
    let dateStub,
      digitallyFormattedTime,
      expected = "17:30";
    
    beforeEach(() => {
      dateStub = sinon.useFakeTimers(new Date(2016, 10, 22, 17, 30, 0, 0).getTime());
      digitallyFormattedTime = getDigitallyFormattedTime();
    });
  
    afterEach(() => {
      dateStub.restore();
    });
  
    it('should return a digitally formatted time string representing the correct time', () => {
      expect(digitallyFormattedTime).to.equal(expected);
    });
  });
  
  describe('when formatTimePart is called', () => {
    describe('when the provided time part is less than 10', () => {
      let timePart = 9,
        actual = formatTimePart(timePart),
        expected = "09";
      
      it('should prepend a 0 to the returned timepart', () => {
        expect(actual).to.equal(expected);
      });
    });
  
    describe('when the provided time part is more than or equal to 10', () => {
      let timePart = 10,
        actual = formatTimePart(timePart),
        expected = 10;
    
      it('should return the given timepart with no amendments', () => {
        expect(actual).to.equal(expected);
      });
    });
  });
});
