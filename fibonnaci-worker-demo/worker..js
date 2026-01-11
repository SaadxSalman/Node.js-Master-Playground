const { parentPort } = require('worker_threads');

// Recursive Fibonnaci is 0(2^n) - intentionally slow for demo purposes
function fibonnaci(n) {
	if (n <= 1) return n;
	return fibonnaci(n - 1) + fibonnaci(n - 2);
}

// Listen for messages from the main thread
parentPort.on('message', (n) => {
	const result = fibonnaci(n);
	parentPort.postMessage(result);
});