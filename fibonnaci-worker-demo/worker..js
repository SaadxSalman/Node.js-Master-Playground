const { parentPort } = require('worker_threads');

// Recursive Fibonacci is O(2^n) - intentionally slow for demo purposes
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Listen for messages from the main thread
parentPort.on('message', (n) => {
    const result = fibonacci(n);
    parentPort.postMessage(result);
});