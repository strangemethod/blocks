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
    const allowedExtensions = ['jpg', 'png', 'gif'];
    const segments = imagePath.split('.');
    const isImage = segments[segments.length - 1] in allowedExtensions;
    if (isImage) return imagePath;
    return imagePath;
  });

  // Assign image src to data model.
  const imagesData = images.map((imagePath) => {
    return {
      'caption': Models.image.caption,
      'src': `/img/${pageId}/${imagePath}`,
      'type': Models.image.type
    };
  });

  // Break image data into individual arrays of 2.
  const perChunk = 2; 
  const chunkedImageData = imagesData.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / perChunk);
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  // Write data to blocks file.
  jsonfile.writeFile(blocksDataPath, chunkedImageData, {spaces: 2}, function (err) {
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
