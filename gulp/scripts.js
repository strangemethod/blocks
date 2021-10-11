var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var path = require('path');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var CONFIG_ = require('../config');

/*
 * Compile scripts.
 */

gulp.task('scripts', () => {
	const nodeEnv = process.env.NODE_ENV;
	const webpackMode = nodeEnv === 'development' ? nodeEnv : 'production';

  return gulp.src(path.join(CONFIG_.paths.scripts, '*.js'))
    .pipe(webpack({
		  mode: webpackMode,
		}))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
  .pipe(livereload(server));
});