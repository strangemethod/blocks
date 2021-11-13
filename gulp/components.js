var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var autoprefixer = require('gulp-autoprefixer');
var server = lr();
var merge = require('merge-stream');
var path = require('path');
var babel = require('gulp-babel');
var CONFIG_ = require('../config');


/*
 * Compile components and their libraries.
 */

gulp.task('components', function() {
  var compileSass = gulp.src(path.join(CONFIG_.paths.components, '**/*.scss'))
    .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
    .pipe(concat('components.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload(server));

  var compileJs = gulp.src(path.join(CONFIG_.paths.components, '**/*.js'))
    .pipe(babel({
          presets: ['env']
      }))
    .pipe(concat('components.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload(server));

  return merge(compileSass, compileJs);
});