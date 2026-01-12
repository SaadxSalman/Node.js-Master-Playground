"use client";
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
// We import the native module dynamically to avoid SSR issues
const native = require('../native/index.js'); 

export default function CryptoPage() {
  const [input, setInput] = useState("Heavy data to encrypt ".repeat(1000));
  const [results, setResults] = useState<{ rust: number; js: number } | null>(null);

  const runBenchmark = () => {
    const key = "12345678901234567890123456789012"; // 32 bytes

    // JS Benchmark
    const startJS = performance.now();
    for(let i=0; i<100; i++) {
        CryptoJS.AES.encrypt(input, key).toString();
    }
    const endJS = performance.now();

    // Rust Benchmark
    const startRust = performance.now();
    for(let i=0; i<100; i++) {
        native.encryptRust(input, key);
    }
    const endRust = performance.now();

    setResults({ js: endJS - startJS, rust: endRust - startRust });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Rust vs JS Cryptography</h1>
      <textarea 
        className="w-full p-4 border rounded bg-gray-50 text-black"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        onClick={runBenchmark}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Run 100x Benchmark
      </button>

      {results && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded bg-blue-50">
            <h2 className="font-bold">Pure JS (Crypto-JS)</h2>
            <p className="text-2xl">{results.js.toFixed(2)} ms</p>
          </div>
          <div className="p-4 border rounded bg-orange-50">
            <h2 className="font-bold">Rust (N-API)</h2>
            <p className="text-2xl">{results.rust.toFixed(2)} ms</p>
          </div>
        </div>
      )}
    </div>
  );
}