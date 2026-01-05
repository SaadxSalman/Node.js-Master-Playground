const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');

/**
 * Converts CSV to JSON using Streams to keep memory usage low.
 * @param {string} inputPath - Path to the source CSV
 * @param {string} outputPath - Path to the destination JSON
 */
const migrateCsvToJson = (inputPath, outputPath) => {
  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);

  // A Transform stream to format the JSON array correctly
  let isFirstChunk = true;
  const jsonTransformer = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      let data = JSON.stringify(chunk, null, 2);
      
      if (isFirstChunk) {
        data = '[' + data;
        isFirstChunk = false;
      } else {
        data = ',\n' + data;
      }
      callback(null, data);
    },
    flush(callback) {
      this.push('\n]');
      callback();
    }
  });

  console.time('Migration Time');

  readStream
    .pipe(csv())           // Step 1: Parse CSV chunks into JS Objects
    .pipe(jsonTransformer) // Step 2: Wrap objects into a JSON array format
    .pipe(writeStream)     // Step 3: Write chunks to disk
    .on('finish', () => {
      console.timeEnd('Migration Time');
      console.log('Migration complete. Memory usage stayed low!');
    })
    .on('error', (err) => {
      console.error('Migration failed:', err);
    });
};

module.exports = migrateCsvToJson;