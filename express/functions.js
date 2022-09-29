const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs-extra');
const Models = require('./models/models.js');
const PATHS = require('./constants.js');


/* 
 * Get data object containing list of all pages.
 */
const getPagesData = () => {
  const pagesJson = fs.existsSync(PATHS.pagesData) ? fs.readFileSync(PATHS.pagesData) : null;
  return pagesJson ? JSON.parse(pagesJson) : [];    
}

/* 
 * Converts string to page slug.
 * @param {string} str
 */
const slugify = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase();;
}


/* 
 * Write data for the blocks of a new page.
 * Initial data is based on image directory with matching slug.
 * @param {string} title
 */
const writeBlocksData = (title) => {
  const pageId = slugify(title);
  const blocksDataPath = `${PATHS.blocksData}${pageId}.json`;
  const imagesPath = `${PATHS.images}${pageId}/`;

  // Filter out any non-image files.
  const images = fs.readdirSync(imagesPath).filter((imagePath) => {
    const isSystemFile = imagePath[0] === '.';
    const allowedExtensions = ['jpg', 'png', 'gif'];
    const segments = imagePath.split['.'];
    const isImage = segments[segments.length - 1] in allowedExtensions;
    if (!isSystemFile && isImage) return imagePath;
  });

  // Assign image src to data model.
  const imagesData = images.map((imagePath) => {
    return [{
      'caption': Models.image.caption,
      'src': `${PATHS.prodContent}${pageId}/${imagePath}`,
      'type': Models.image.type
    }];
  });
  
  jsonfile.writeFile(blocksDataPath, imagesData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
}

/* 
 * Write new page to list of all pages.
 * @param {string} title
 */
const writePageData = (title) => {
  let pagesData = getPagesData();
  const pageId = slugify(title);
  const pageData = {
    'title': title,
  }
  pagesData[pageId] = pageData;

  // Write to pages.json.
  jsonfile.writeFile(PATHS.pagesData, pagesData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
}

module.exports.getPagesData = getPagesData;
module.exports.slugify = slugify;
module.exports.writeBlocksData = writeBlocksData;
module.exports.writePageData = writePageData;
