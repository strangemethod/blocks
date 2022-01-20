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
  
  // Get Pages data.
  const pagesDataPath = path.join(CONFIG_.paths.data, 'pages.json');
  const rawPagesData = fs.readFileSync(pagesDataPath);
  const pagesData = JSON.parse(rawPagesData);

  // Get index page data.
  const indexDataPath = path.join(CONFIG_.paths.data, 'blocks', `index.json`);
  const rawIndexData = fs.readFileSync(indexDataPath);
  indexData = JSON.parse(rawIndexData);
  pagesData['index'] = indexData;

  // Create pages from JSON data.
  const pageKeys = Object.keys(pagesData);
  pageKeys.forEach((pageKey) => {
    const page = pagesData[pageKey];
    const pageTemplate = page.template || 'page.hbs';
    const isIndex = pageKey === 'index';
    const destPath = isIndex ? '' : `${pageKey}/`;
    let blocksData = {};

    if (!isIndex) {
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
          get_component: function(blockArray) {
            const blockTypes = blockArray.map((block) => {
              return block.type;
            });
            const component = blockArray.length ? blockTypes.join('-') : null;
            return component;
          },
          equal_values: function(a, b) {
            return a == b;
          },
          escape_html: function(input) {
            return escape(input);
          },
          get_partial: function(input) {
            return input + '/' + input;
          },
          unescape_html: function(input) {
            return unescape(input);
          },
        })
        .helpers(layouts);

    return gulp
        .src(path.join(CONFIG_.paths.templates, pageTemplate))
        .pipe(pagesStream)
        .pipe(rename(`${destPath}index.html`))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload(server));
  });
});