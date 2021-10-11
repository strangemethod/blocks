const gulp = require('gulp');
const data = require('gulp-data');
const hb = require('gulp-hb');
const rename = require('gulp-rename');
const layouts = require('handlebars-layouts');
const livereload = require('gulp-livereload');
const lr = require('tiny-lr');
const server = lr();
const path = require('path');
const CONFIG_ = require('../config');
const fs = require('fs');

/*
 * Compile handlebars templates
 */

gulp.task('handlebars', () => {
  const nodeEnv = process.env.NODE_ENV;
  const editMode = nodeEnv === 'development';
  const pagesDataPath = path.join(CONFIG_.paths.data, 'pages.json');
  const rawPagesData = fs.readFileSync(pagesDataPath);
  const pagesData = JSON.parse(rawPagesData);

  // Push index page to pages data.
  const indexPage = {
    "id": "index",
    "title": "Blocks",
    "text": "A simple, database-free CMS for storytelling.",
    "template": "index.hbs"
  }
  pagesData.push(indexPage);

  // Create pages from JSON data.
  pagesData.forEach((page) => {
    const pageTemplate = page.template || 'page.hbs';
    const destPath = page.id === 'index' ? '' : `${page.id}/`;

    console.log(page.id);
    console.log(destPath);

    const pagesStream = hb()
        .partials(path.join(CONFIG_.paths.partials, '*.hbs'))
        .partials(path.join(CONFIG_.paths.components, '**/*.hbs'))
        .data(path.join(CONFIG_.paths.data, '*.json'))
        .data({'page': page})
        .data({'editMode': editMode})
        .helpers({
          get_partial: function(input) {
            return input + '/' + input;
          }
        })
        .helpers(layouts);

    return gulp
        .src(path.join(CONFIG_.paths.templates, pageTemplate))
        .pipe(pagesStream)
        .pipe(rename(`${destPath}index.html`))
        .pipe(gulp.dest('./public'))
        .pipe(livereload(server));
  });     
});