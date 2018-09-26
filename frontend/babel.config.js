const fs = require('fs');

const babelConfig = fs.readFileSync('./.babelrc', 'utf8');
module.exports = JSON.parse(babelConfig);
