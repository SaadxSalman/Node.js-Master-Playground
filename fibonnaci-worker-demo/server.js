const express = require('express');
const { Worker } = require('worker_threads');
const path = require('path');

const app =  express()
const PORT = 3000;

app.use(express.statis('public'));

app.get('/calculate/:number', (req, res) => {
	const n = parseInt(req.params.number);

	// Create a new worker thread
	const worker = new Worker('./worker.js');

	// Send the number to the worker
	worker.postMessage(n);

	// Receive the result back
	worker.on('message', (result) => {
	    res.json({ n, result, status: 'success' });
	    worker.terminate(); // Clean up the thread
	});

	worker.on('error', (err) => {
	    res.status(500).json({ error: err.message });
	});
});

app.listen(PORT, () => {
	console.log('Server running at https://localhost:${PORT}');
});