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
    "index" : true,
    "title": "Blocks",
    "text": "A simple, database-free CMS for storytelling.",
    "template": "index.hbs"
  }
  pagesData['index'] = indexPage;

  // Create pages from JSON data.
  const pageKeys = Object.keys(pagesData);
  pageKeys.forEach((pageKey) => {
    const page = pagesData[pageKey];
    const pageTemplate = page.template || 'page.hbs';
    const isIndex = pageKey === 'index';
    const destPath = isIndex ? '' : `${pageKey}/`;
    let blocksData = {};

    if (!isIndex){
      const blocksDataPath = path.join(CONFIG_.paths.data, 'blocks', `${pageKey}.json`);
      const rawBlocksData = fs.readFileSync(blocksDataPath);
      blocksData = JSON.parse(rawBlocksData);
    }

    const pagesStream = hb()
        .partials(path.join(CONFIG_.paths.partials, '*.hbs'))
        .partials(path.join(CONFIG_.paths.components, '**/*.hbs'))
        .partials(path.join(CONFIG_.paths.editor, '**/*.hbs'))
        .data(path.join(CONFIG_.paths.data, '*.json'))
        .data({'id': pageKey, 'page': page, 'blocks': blocksData })
        .data({'editMode': editMode})
        .helpers({
          get_partial: function(input) {
            return input + '/' + input;
          },
          equal_values: function(a, b) {
            return a == b;
          },
          escape_html: function(input) {
            return escape(input);
          },
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