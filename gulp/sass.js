var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var autoprefixer = require('gulp-autoprefixer');
var server = lr();
var path = require('path');
var CONFIG_ = require('../config');


/*
 * Compile SASS.
 */

gulp.task('sass', function() {
  return gulp.src(path.join(CONFIG_.paths.sass, '*.scss'))
    .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload(server));
});