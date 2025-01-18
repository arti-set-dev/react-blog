const { rimraf } = require('rimraf');
const path = require('path');

const cacheDir = path.join(__dirname, '..', 'node_modules', '.cache');

rimraf(cacheDir)
  .then(() => console.log('.cache folder cleared successfully.'))
  .catch((err) => console.error(`Failed to clear .cache folder: ${err.message}`));
