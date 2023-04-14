const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');
const Models = require('../models/models.js');
const PATHS = require('../constants.js');

getPageData = (pageId) => {
  const path = `${PATHS.blocksData}${pageId}.json`;
  const pageJson = fs.existsSync(path) ? fs.readFileSync(path) : null;
  const pageData = pageJson ? JSON.parse(pageJson) : [];
  return pageData;
}

validateParams = (requiredParams, params, res) => {
  requiredParams.forEach(requiredParam => {
    if (!params[requiredParam]) {
      res.send({error: `Missing param: ${requiredParam}`});
    }
  });
}

writeFile = (pageId, data) => {
  const path = `${PATHS.blocksData}${pageId}.json`;
  jsonfile.writeFile(path, data, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
}

/*
 * Edit block endpoint.
 * @param page {string} name of json file containing the block.
 * @param operation {string (add|edit|delete)} operation to perform on the block.
 * @param data {array} array of block changes.
 */
router.post('/block/edit', (req, res) => {
  const params = req.body;
  const requiredParams = ['page', 'data']
  validateParams(requiredParams, params, res);
  const pageData = getPageData(params.page);
  
  // Loop through posted data.
  Object.keys(params.data).forEach(key => {
    const blockData = pageData[key];
    const blockChanges = params.data[key];
    
    // Update block columns.
    blockChanges.cols.forEach((newCol, i) => {
      blockData[i].cols = newCol;
    });
  }); 

  // Write new data to file.
  writeFile(params.page, pageData);
  res.send({'success': true});
});

/*
 * Block endpoint.
 * @param page {string} name of json file containing the block.
 * @param operation {string (add|edit|delete)} operation to perform on the block.
 * @param data {array} array of block changes.
 */
// router.post('/block', (req, res) => {
//   const pageDataPath = `${dataPath}${req.body.page}.json`;
//   const pageData = getPageData(pageDataPath);
//   const operation = req.body.operation;

//   if (!operation) console.warn('!!! No operation sent to the server !!!');

//   // Update page data.
//   switch (operation) {
//     case 'add':
//       console.log('add')
//       // const blockModel = Models[req.body.blockType];
//       // section = pageData[req.body.sectionIndex];
//       // section.push(blockModel);
//       break;
//     case 'delete':
//       // section = pageData[req.body.sectionIndex];
//       // section.splice(req.body.blockIndex, 1);
//       break;
//     case 'edit':
//       console.log('edit');
//       console.log(req.body.page);
//       console.log(req.body.data);

//       break;
//   }

//   // writeFile(pageDataPath, pageData);
//   res.send('success');
// });

// Section endpoint.
// router.post('/section', (req, res) => {
//   console.log('hit section');
//   const pageDataPath = `${dataPath}${req.body.page}.json`;
//   const pageData = getPageData(pageDataPath);
//   const operation = req.body.operation

//   // Update page data.
//   switch (operation) {
//     case 'add':
//       pageData.push([Models.image]);
//       break;
//     case 'delete':
//       console.log('section delete');
//       pageData.splice(req.body.sectionIndex, 1);
//       break;
//     case 'order':
//       const section = pageData.splice(req.body.sectionIndex, 1);
//       const newIndex = parseInt(req.body.sectionIndex) + parseInt(req.body.order);
//       pageData.splice(newIndex, 0, section[0]);
//       break;
//   }

//   writeFile(pageDataPath, pageData);
//   res.send('success');
// });


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
