import weatherToIcons from '../config/weatherToIcons.js';

export function getWeatherIcon(weatherStatus, dayOrNight) {
	return weatherToIcons[weatherStatus][dayOrNight];
}

export function convertFahrenheitToCelcius(fahrenheit) {
	return Math.round((fahrenheit -32) * 5 / 9);
}
