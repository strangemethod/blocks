const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');
const dataPath = './src/data/blocks/';
const Models = require('../models/models.js');

getPageData = (pageDataPath) => {
  const pageJson = fs.existsSync(pageDataPath) ? fs.readFileSync(pageDataPath) : null;
  const pageData = pageJson ? JSON.parse(pageJson) : [];
  return pageData;
}


// Add section
router.post('/add-section', (req, res) => {
  const pageDataPath = `${dataPath}${req.body.page}.json`;
  const pageData = getPageData(pageDataPath);
  const sectionModel = [Models.image];

  pageData.push(sectionModel);

  // Write JSON to file.
  jsonfile.writeFile(pageDataPath, pageData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send('success');
});

// Delete section
router.post('/delete-section', (req, res) => {
  const pageDataPath = `${dataPath}${req.body.page}.json`;
  const pageData = getPageData(pageDataPath);

  pageData.splice(req.body.index, 1);

  // Write JSON to file.
  jsonfile.writeFile(pageDataPath, pageData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send('success');
});


// Add block.
// router.post('/add-block', (req, res) => {
//   const pageDataPath = `${dataPath}${req.body.page}.json`;

//   // Get existing page data.
//   const pageJson = fs.existsSync(pageDataPath) ? fs.readFileSync(pageDataPath) : null;
//   const pageData = pageJson ? JSON.parse(pageJson) : {};
//   const blockCount = Object.keys(pageData).length;

//   // Get component model.
//   const blockModel = Models[req.body.blockType];
//   const newId = `block-${blockCount + 1}`;

//   // @todo: ensure block ID doens't exist.
//   pageData[newId] = blockModel;

//   // Write JSON to file.
//   jsonfile.writeFile(pageDataPath, pageData, {spaces: 2}, function (err) {
//     if (err) console.error(err)
//   });

//   res.send('success');
// });


// // Edit block.
// router.post('/edit-block', (req, res) => {
// 	const pageDataPath = `${dataPath}${req.body.page}.json`;

// 	// Get existing page data.
//   const pageJson = fs.existsSync(pageDataPath) ? fs.readFileSync(pageDataPath) : null;
//   const pageData = pageJson ? JSON.parse(pageJson) : {};

//   // Parse request data.
//   const {
//     blockId,
//     fieldId,
//     fieldInput
//   } = req.body;

//   pageData[blockId][fieldId] = fieldInput;

// 	// Write JSON to file.
//   jsonfile.writeFile(pageDataPath, pageData, {spaces: 2}, function (err) {
//     if (err) console.error(err)
//   });

//   res.send('success');
// });

// // Delete block.
// router.post('/delete-block', (req, res) => {
//   const pageDataPath = `${dataPath}${req.body.page}.json`;

//   // Get existing page data.
//   const pageJson = fs.existsSync(pageDataPath) ? fs.readFileSync(pageDataPath) : null;
//   const pageData = pageJson ? JSON.parse(pageJson) : {};

//   delete pageData[req.body.blockId];

//   // // Write JSON to file.
//   jsonfile.writeFile(pageDataPath, pageData, {spaces: 2}, function (err) {
//     if (err) console.error(err)
//   });

//   res.send('success');
// });


module.exports = router;
