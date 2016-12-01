import {getWeatherIcon, convertFahrenheitToCelcius} from '../../../src/util/weatherUtils.js';
import {expect} from '../../util/testUtils';

describe('Given the weatherUtils utility file', () => {
  describe('when the getWeatherIcon function is called', () => {
    let weatherStatus = 'sleet',
      dayOrNight = 'day',
      expected = 'wi-day-sleet',
      actual;
    
    beforeEach(() => {
      actual = getWeatherIcon(weatherStatus, dayOrNight);
    });
    
    it('should return the correct weather icon', () => {
      expect(actual).to.equal(expected);
    });
  });
  
  describe('when the convertFahrenheitToCelcius function is called', () => {
    let fahrenheit = 70,
      expected = 21,
      actual;
    
    beforeEach(() => {
      actual = convertFahrenheitToCelcius(fahrenheit);
    });
    
    it('should return the correct celcius value', () => {
      expect(actual).to.equal(expected);
    });
  });
});
