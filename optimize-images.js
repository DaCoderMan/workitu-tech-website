const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images', 'projects');
const files = fs.readdirSync(imagesDir).filter(file => file.endsWith('.png'));

console.log('🖼️  Optimizing portfolio images...\n');

const optimizeImage = async (filename) => {
  const inputPath = path.join(imagesDir, filename);
  const outputPath = path.join(imagesDir, filename);

  const stats = fs.statSync(inputPath);
  const sizeBefore = (stats.size / 1024).toFixed(2);

  try {
    await sharp(inputPath)
      .resize(1200, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: 80,
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .toFile(outputPath + '.tmp');

    // Replace original
    fs.renameSync(outputPath + '.tmp', outputPath);

    const newStats = fs.statSync(outputPath);
    const sizeAfter = (newStats.size / 1024).toFixed(2);
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    console.log(`✅ ${filename}`);
    console.log(`   ${sizeBefore}KB → ${sizeAfter}KB (${reduction}% reduction)\n`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
};

(async () => {
  for (const file of files) {
    await optimizeImage(file);
  }
  console.log('🎉 All images optimized!');
})();
