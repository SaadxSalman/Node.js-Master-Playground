const fs = require('fs');
const fse = require('fs-extra'); // Helper for folder creation
const csv = require('csv-parser');
const { Transform } = require('stream');

const migrateCsvToJson = (inputPath, outputPath, io) => {
  // Ensure the output directory exists
  fse.ensureDirSync('converted');

  const stats = fs.statSync(inputPath);
  const totalSize = stats.size;
  let processedSize = 0;

  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);

  let isFirstChunk = true;
  const jsonTransformer = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      // Track progress
      processedSize += JSON.stringify(chunk).length; 
      const progress = Math.min(99, Math.floor((processedSize / totalSize) * 100));
      io.emit('migrationProgress', { progress });

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

  readStream
    .pipe(csv())
    .pipe(jsonTransformer)
    .pipe(writeStream)
    .on('finish', () => {
      io.emit('migrationProgress', { progress: 100, status: 'Complete!' });
    })
    .on('error', (err) => {
      io.emit('migrationError', { message: err.message });
    });
};

module.exports = migrateCsvToJson;