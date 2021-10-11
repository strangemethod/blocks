var gulp = require('gulp');
var requireDir = require('require-dir');

/*
 * Require directory containing gulp tasks
 */
requireDir('./gulp');
process.env.NODE_ENV = 'development';

console.log('Running gulp in dev mode.');

gulp.task('default', ['handlebars', 'components', 'sass', 'scripts', 'connect', 'watch'], function() {});