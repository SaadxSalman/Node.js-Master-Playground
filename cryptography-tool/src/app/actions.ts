"use server";

import path from 'path';

export async function runRustBenchmarkAction(data: string, key: string) {
  // 1. Get the absolute path to the native folder
  // process.cwd() is the root: C:\...\cryptography-tool
  const NATIVE_MODULE_PATH = path.join(process.cwd(), 'native', 'index.js');

  try {
    /** * 2. Bypassing the Bundler
     * We use eval('require') so Next.js doesn't try to bundle the Rust binary.
     * This forces it to load the file directly from your hard drive at runtime.
     */
    const native = eval('require')(NATIVE_MODULE_PATH);

    console.log(`🚀 Executing Rust FFI for saadxsalman...`);
    
    // Run iterations
    for (let i = 0; i < 100; i++) {
      native.encryptRust(data, key);
    }

    return { success: true };
  } catch (error) {
    console.error("CRITICAL ERROR: Could not load or run native module.");
    console.error("Path attempted:", NATIVE_MODULE_PATH);
    console.error("Actual Error:", error);
    return { success: false, error: "Native module bridge failed" };
  }
}