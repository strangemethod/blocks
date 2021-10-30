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

  return gulp.src(path.join(CONFIG_.paths.scripts, 'app.js'))
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
  .pipe(livereload(server));
});