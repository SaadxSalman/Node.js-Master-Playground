// Add this to a new file named test.ts
export function processData(items: any[]) {
  // 1. Using 'any' is bad practice
  // 2. Hardcoded secret (Security Risk)
  const API_KEY = "12345-SECRET-KEY"; 

  // 3. Nested loops (Performance issue)
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      console.log(items[i] + items[j]);
    }
  }
}