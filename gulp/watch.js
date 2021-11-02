var gulp = require('gulp');
var lr = require('tiny-lr');
var path = require('path');
var server = lr();
var CONFIG_ = require('../config');


/*
 * Watch for file changes and run tasks.
 */

gulp.task('watch', function() {
  server.listen(35729, function (err) {
    if (err) return console.error(err);
    gulp.watch(path.join(CONFIG_.paths.data, '**/*.json'), ['handlebars']);
    gulp.watch(path.join(CONFIG_.paths.partials, '**/*.hbs'), ['handlebars']);
    gulp.watch(path.join(CONFIG_.paths.templates, '**/*.hbs'), ['handlebars']);
    gulp.watch(path.join(CONFIG_.paths.editor, '**/*.hbs'), ['handlebars']);
    gulp.watch(path.join(CONFIG_.paths.components, '**/*.hbs'), ['handlebars']);
    gulp.watch(path.join(CONFIG_.paths.components, '**/*.{scss,js}'), ['components']);
    gulp.watch(path.join(CONFIG_.paths.sass, '**/*.scss'), ['sass']);
    gulp.watch(path.join(CONFIG_.paths.scripts, '**/*.jsx'), ['scripts']);
  });
});