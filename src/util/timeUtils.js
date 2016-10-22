export function calculateMinutesUntilArrival(timeOfArrivalData) {
	let timeOfArrival = new Date(timeOfArrivalData);
	let minutesUntilArrival = Math.round((timeOfArrival.getTime() - Date.now())/60000);

	return minutesUntilArrival > 0 ? minutesUntilArrival : 0;
}

export function getDigitallyFormattedTime() {
	let today = new Date();
	let hours = formatTimePart(today.getHours());
	let minutes = formatTimePart(today.getMinutes());
	let time = hours + ":" + minutes;

	return time;
}

export function formatTimePart(timePart) {
	return timePart >= 10 ? timePart : '0' + timePart;
}
