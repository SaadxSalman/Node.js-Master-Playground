const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (file) => {
    const fileName = path.parse(file.filename).name;
    const outputDir = path.join(__dirname, '../processed');

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const tasks = [
        // 1. Thumbnail (200x200)
        sharp(file.path)
            .resize(200, 200)
            .toFile(path.join(outputDir, `${fileName}-thumb.webp`)),

        // 2. Greyscale Version
        sharp(file.path)
            .grayscale()
            .toFile(path.join(outputDir, `${fileName}-grey.webp`)),

        // 3. Compressed Mobile Version
        sharp(file.path)
            .resize(800) // Width only, auto height
            .webp({ quality: 60 })
            .toFile(path.join(outputDir, `${fileName}-mobile.webp`))
    ];

    return Promise.all(tasks);
};

module.exports = { processImage };