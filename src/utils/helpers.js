/**
 * Call a function at intervals.
 *
 * @param {number} interval The interval in milliseconds.
 * @param {Function} fn The function to call.
 * @returns {Function} A function that can be called to stop the timer.
 */
export function callFunctionInInterval(fn, interval) {
	const intervalId = setInterval(fn, Number(interval));

	// To stop the timer, call clearInterval() with the intervalId
	function clearTimer() {
		clearInterval(intervalId);
	}

	return clearTimer;
}
