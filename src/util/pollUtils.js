export function pollFor(action, pollTime) {
	action();
	setInterval(() => { action() }, pollTime);
}
