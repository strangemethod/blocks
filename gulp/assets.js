var gulp = require('gulp');
const CONFIG_ = require('../config');
const path = require('path');

gulp.task('assets', () => {
  return gulp.src(path.join(CONFIG_.paths.assets, '*'))
    .pipe(gulp.dest('./dist/assets'));
});
