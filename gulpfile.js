const {series, parallel, src, dest, watch} = require('gulp')
const sass = require('gulp-sass')(require('node-sass'));
const {paths} = require('./config');

// Clean 
const del = require('del');

// CSS
const autoprefixer = require('gulp-autoprefixer');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const lr = require('tiny-lr');
const path = require('path');
const server = lr();

// JS
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');

// Handlebars
const data = require('gulp-data');
const hb = require('gulp-hb');
const rename = require('gulp-rename');
const layouts = require('handlebars-layouts');
const fs = require('fs');

var gulpConnect = require('gulp-connect');


process.env.NODE_ENV = 'development';

/*
 * Copy assets.
 */
function assets () {
  return src(path.join(paths.assets, '*'))
    .pipe(dest(`${paths.output}/assets`));
}

/*
 * Remove build directory
 */
function clean(done) {
  // clean the build folders
  del.sync([paths.output])
  return done()
}

/*
 * Compile SASS.
 */
function css() {
  return src(path.join(paths.scss, '*.scss'))
    .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
    .pipe(dest('./dist/css'))
    .pipe(livereload(server));
}

/*
 * Connect the local server.
 */
function connect() {
  gulpConnect.server({
    port: 3000,
    root: ['dist'],
    livereload: true
  });
}

/*
 * Compile handlebars templates
 */
function hbs(done) {
  const nodeEnv = process.env.NODE_ENV;
  const editMode = nodeEnv === 'development';
  
  // Get Pages data.
  const pagesDataPath = path.join(paths.data, 'pages.json');
  const rawPagesData = fs.readFileSync(pagesDataPath);
  const pagesData = JSON.parse(rawPagesData);

  // Get index page data.
  const indexDataPath = path.join(paths.data, 'blocks', `index.json`);
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
      const blocksDataPath = path.join(paths.data, 'blocks', `${pageKey}.json`);
      const rawBlocksData = fs.readFileSync(blocksDataPath);
      blocksData = JSON.parse(rawBlocksData);
    }

    const pagesStream = hb()
        .partials(path.join(paths.partials, '*.hbs'))
        .partials(path.join(paths.components, '**/*.hbs'))
        .data(path.join(paths.data, '*.json'))
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

    return src(path.join(paths.templates, pageTemplate))
        .pipe(pagesStream)
        .pipe(rename(`${destPath}index.html`))
        .pipe(dest(paths.output))
        .pipe(livereload(server));
  });
  done();
}

/*
 * Compile scripts.
 */
function js() {  
  const nodeEnv = process.env.NODE_ENV;
  const webpackMode = nodeEnv === 'development' ? nodeEnv : 'production';

  return src(path.join(paths.scripts, 'app.jsx'))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(uglify())
    .pipe(dest('./dist/js'))
    .pipe(livereload(server));
}

/*
 * Watch for file changes and run tasks.
 */
function watchFiles() {
  server.listen(35729, function (err) {
    if (err) return console.error(err);
    watch(path.join(paths.assets, '*'), ['assets']);
    watch(path.join(paths.data, '**/*.json'), ['handlebars']);
    watch(path.join(paths.partials, '**/*.hbs'), ['handlebars']);
    watch(path.join(paths.templates, '**/*.hbs'), ['handlebars']);
    watch(path.join(paths.components, '**/*.{scss,js}'), ['components']);
    watch(path.join(paths.sass, '**/*.scss'), ['sass']);
    watch(path.join(paths.scripts, '**/*.jsx'), ['scripts']);
  });
}


// gulp.task('default', [connect', 'watch'], function() {});
exports.default = series(clean, parallel(css, js, hbs, assets), series(connect, watchFiles))
