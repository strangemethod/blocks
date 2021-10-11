var gulp = require('gulp');
var requireDir = require('require-dir');

/*
 * Require directory containing gulp tasks
 */
requireDir('./gulp');
process.env.NODE_ENV = 'production';

console.log('Running gulp in prod mode.');

gulp.task('default', ['handlebars', 'components', 'sass', 'scripts', 'connect', 'watch'], function() {});