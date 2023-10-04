const {series, parallel, src, dest, watch} = require('gulp')
const sass = require('gulp-sass')(require('node-sass'));
const {paths} = require('./config');
const jsonfile = require('jsonfile');

// Assets
const merge = require('merge-stream');

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

/*
 * Copy assets.
 */
function assets () {
  let copyAssets = src(path.join(paths.assets, '*'))
    .pipe(dest(`${paths.output}/assets`));
  let copyContent = src(path.join(paths.content, '**/*'))
    .pipe(dest(`${paths.output}/img`));
  return merge(copyAssets, copyContent);
}

/*
 * Remove build directory
 */
function clean(done) {
  // clean the build folders
  del.sync([`${paths.output}`])
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
function connect(done) {
  gulpConnect.server({
    port: 3000,
    root: ['dist'],
    livereload: true
  });
  return done();
}

/*
 * Compile handlebars templates
 */
function hbs(done) {
  const editMode = process.env.NODE_ENV === 'development';

  // Get Pages data.
  const pagesDataPath = path.join(paths.data, 'pages.json');
  const pagesData = JSON.parse(fs.existsSync(pagesDataPath)) ? fs.readFileSync(pagesDataPath) : {};

  // Get index page data.
  const indexData = {
    "id": "index",
    "index" : true,
    "title": "Blocks",
    "description": "A simple, database-free CMS for storytelling.",
    "template": "index.hbs"
  }
  pagesData['index'] = indexData;

  // Create pages from JSON data.
  const pageKeys = Object.keys(pagesData);
  pageKeys.forEach((pageKey) => {
    const page = pagesData[pageKey];
    const pageTemplate = page.template || 'page.hbs';
    const isIndex = pageKey === 'index';
    const destPath = isIndex ? '' : `/blocks/${pageKey}/`;
    let blocksData = {};

    if (!isIndex) {
      const blocksDataPath = path.join(paths.data, 'blocks', `${pageKey}.json`);
      const rawBlocksData = fs.readFileSync(blocksDataPath);
      blocksData = JSON.parse(rawBlocksData);
    }

    const pagesStream = hb()
        .partials(path.join(paths.layouts, '*.hbs'))
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
          has_keys: function(obj) {
            return obj && Object.keys(obj).length;
          },
          unescape_html: function(input) {
            return unescape(input);
          },
          to_json: function(obj) {
            return JSON.stringify(obj, null, 3);
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
  return src(path.join(paths.scripts, 'app.jsx'))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(uglify())
    .pipe(dest('./dist/js'))
    .pipe(livereload(server));
}


/*
 * Watch for file changes and run tasks.
 */
function watchFiles(done) {
  // return watch(['./src/js/editor/editor.jsx'], series(js))
  return (
    watch(
      [path.join(paths.scripts, '**/*.jsx'), path.join(paths.scripts, '**/*.js')],
      series(js, function jsCallback(done) {
        done();
      })
    ),
    watch(
      path.join(paths.data, '**/*.json'),
      series(hbs, function hbsCallback(done) {
        done();
      })
    ),
    watch(
      path.join(paths.assets, '*'),
      series(assets, function assetsCallback(done) {
        console.log('assets changed')
        done();
      })
    ),
    watch(
      path.join(paths.layouts, '**/*.hbs'),
      series(hbs, function partialsCallback(done) {
        done();
      })
    ),
    watch(
      path.join(paths.templates, '**/*.hbs'),
      series(hbs, function templatesCallback(done) {
        done();
      })
    ),
    watch(
      path.join(paths.components, '**/*.hbs'),
      series(hbs, function componentsCallback(done) {
        done();
      })
    ),
    watch(
      path.join(paths.components, '**/*.scss'),
      series(css, function componentsCallback(done) {
        done();
      })
    ),
    watch(
      path.join(paths.scss, '**/*.scss'),
      series(css, function cssCallback(done) {
        done();
      })
    )
  )
}


// gulp.task('default', [connect', 'watch'], function() {});
exports.default = series(clean, parallel(css, js, hbs, assets), parallel(watchFiles, connect))
