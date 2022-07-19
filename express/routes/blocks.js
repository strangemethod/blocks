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

writeFile = (path, data) => {
  jsonfile.writeFile(path, data, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
}

// Block endpoint.
router.post('/block', (req, res) => {
  const pageDataPath = `${dataPath}${req.body.page}.json`;
  const pageData = getPageData(pageDataPath);
  const operation = req.body.operation
  let section;

  // Update page data.
  switch (operation) {
    case 'add':
      const blockModel = Models[req.body.blockType];
      section = pageData[req.body.sectionIndex];
      section.push(blockModel);
      break;
    case 'delete':
      section = pageData[req.body.sectionIndex];
      section.splice(req.body.blockIndex, 1);
      break;
    case 'edit':
      break;
  }

  writeFile(pageDataPath, pageData);
  res.send('success');
});

// Section endpoint.
router.post('/section', (req, res) => {
  console.log('hit section');
  const pageDataPath = `${dataPath}${req.body.page}.json`;
  const pageData = getPageData(pageDataPath);
  const operation = req.body.operation

  // Update page data.
  switch (operation) {
    case 'add':
      pageData.push([Models.image]);
      break;
    case 'delete':
      console.log('section delete');
      pageData.splice(req.body.sectionIndex, 1);
      break;
    case 'order':
      const section = pageData.splice(req.body.sectionIndex, 1);
      const newIndex = parseInt(req.body.sectionIndex) + parseInt(req.body.order);
      pageData.splice(newIndex, 0, section[0]);
      break;
  }

  writeFile(pageDataPath, pageData);
  res.send('success');
});


// Edit block.
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


module.exports = router;
