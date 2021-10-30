const path = require('path');
const outputDir = path.resolve(__dirname, 'build');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/app.js'),
    output: {
        path: outputDir,
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
   }
};