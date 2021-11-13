var gulp = require('gulp');
var connect = require('gulp-connect');
var CONFIG_ = require('../config');


/*
 * Connect the local server.
 */

gulp.task('connect', function() {
  connect.server({
    port: 3000,
    root: ['dist'],
    livereload: true
  });
});