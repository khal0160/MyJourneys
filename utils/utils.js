export default function timeFormatter(timeMsec) {
	const hour = ("0" + Math.floor((timeMsec / 60000) % 60)).slice(-2);
	const minutes = ("0" + Math.floor((timeMsec / 1000) % 60)).slice(-2);
	const seconds = ("0" + ((timeMsec / 10) % 100)).slice(-2);

	return `${hour}:${minutes}:${seconds}`;
}
