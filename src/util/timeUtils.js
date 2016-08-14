export function calculateMinutesUntilArrival(timeOfArrivalData) {
	var timeOfArrival = new Date(timeOfArrivalData);
	var minutesUntilArrival = Math.round((timeOfArrival.getTime() - Date.now())/60000);

	return minutesUntilArrival > 0 ? minutesUntilArrival : 0;
}

export function getHumanReadableTimeObject() {
	var today = new Date();
	var hours = formatTimePart(today.getHours());
	var minutes = formatTimePart(today.getMinutes());
	var time = hours + ":" + minutes;

	return time;
}

export function formatTimePart(timePart) {
	return timePart >= 10 ? timePart : '0' + timePart;
}
