const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs-extra');
const Models = require('./models/models.js');
const PATHS = require('./constants.js');



/* 
 * Delete block by index.
 * @param page {string} 
 * @param index {number} 
 */
const deleteBlock = (page, index) => {
  const pageId = slugify(page);
  const filePath = `${PATHS.blocksData}${pageId}.json`;
  const data = getBlocksData(filePath)

  data.splice(index, 1);

  // Write data to blocks file.
  jsonfile.writeFile(filePath, data, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
}

/* 
 * Edit block by index.
 * @param page {string}
 * @param index {number}
 * @param styles {object}
 */
const editBlock = (page, index, styles) => {
  const pageId = slugify(page);
  const filePath = `${PATHS.blocksData}${pageId}.json`;
  const data = getBlocksData(filePath)

  if (styles) {
    data[index].styles = styles;

    // Write data to blocks file.
    jsonfile.writeFile(filePath, data, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
  }
}


/* 
 * Get data object containing list of blocks for a page.
 */
const getBlocksData = (filePath) => {
  const blocksJson = fs.existsSync(filePath) ? fs.readFileSync(filePath) : null;
  return blocksJson ? JSON.parse(blocksJson) : [];    
}

/* 
 * Get data object containing list of all pages.
 */
const getPagesData = () => {
  const pagesJson = fs.existsSync(PATHS.pagesData) ? fs.readFileSync(PATHS.pagesData) : null;
  return pagesJson ? JSON.parse(pagesJson) : {};    
}

/* 
 * Re-order block.
 * @param page {string} 
 * @param index {number} 
 * @param delta {number} 
 */
const orderBlock = (page, index, delta) => {
  const pageId = slugify(page);
  const filePath = `${PATHS.blocksData}${pageId}.json`;
  const data = getBlocksData(filePath)

  const block = data.splice(index, 1);
  data.splice(Number(index) + delta, 0, ...block);
  
  // Write data to blocks file.
  jsonfile.writeFile(filePath, data, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
}

/* 
 * Converts string to page slug.
 * @param str {string}
 */
const slugify = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase();;
}


/* 
 * Write data for block.
 * @param title {string}
 * @param type {string}
 * @param text {string}
 * @param images {string}
 */
const writeBlockData = (title, type, text, images) => {
  const pageId = slugify(title);
  const filePath = `${PATHS.blocksData}${pageId}.json`;
  const blocksData = getBlocksData(filePath)
  const blockData = {type: type}

  if (images) {
    blockData.images = images;
  } else if (text) {
    blockData.text = text;
  }

  blocksData.push(blockData);

  // Write data to blocks file.
  jsonfile.writeFile(filePath, blocksData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
}

/* 
 * Write new page to list of all pages.
 * @param title {string} 
 * @param  images {Array} 
 */
const writePageData = (title, images) => {
  const pagesData = getPagesData();
  const pageId = slugify(title);

  pagesData[pageId] = {
    'images': images,
    'title': title
  }

  // Write to pages.json.
  jsonfile.writeFile(PATHS.pagesData, pagesData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
}

module.exports.deleteBlock = deleteBlock;
module.exports.editBlock = editBlock;
module.exports.getPagesData = getPagesData;
module.exports.orderBlock = orderBlock;
module.exports.slugify = slugify;
module.exports.writeBlockData = writeBlockData;
module.exports.writePageData = writePageData;
