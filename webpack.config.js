const path = require('path');
const outputDir = path.resolve(__dirname, 'build');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/app.jsx'),
    output: {
        path: outputDir,
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
   }
};