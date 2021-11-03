const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');
const dataPath = './src/data/blocks/';
const Models = require('../models/models.js');


// Add block.
router.post('/add-block', (req, res) => {
  const pageDataPath = `${dataPath}${req.body.page}.json`;

  // Get existing page data.
  const pageJson = fs.existsSync(pageDataPath) ? fs.readFileSync(pageDataPath) : null;
  const pageData = pageJson ? JSON.parse(pageJson) : {};
  const blockCount = Object.keys(pageData).length;

  // Get component model.
  const blockModel = Models[req.body.blockType];
  const newId = `block-${blockCount + 1}`;

  pageData[newId] = blockModel;

  // Write JSON to file.
  jsonfile.writeFile(pageDataPath, pageData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send('success');
});


// Edit blocks.
router.post('/edit-block', (req, res) => {
	const pageDataPath = `${dataPath}${req.body.page}.json`;

	// Get existing page data.
  const pageJson = fs.existsSync(pageDataPath) ? fs.readFileSync(pageDataPath) : null;
  const pageData = pageJson ? JSON.parse(pageJson) : {};

  // Parse request data.
  const {
    blockId,
    fieldId,
    fieldInput
  } = req.body;

  pageData[blockId][fieldId] = fieldInput;

	// Write JSON to file.
  jsonfile.writeFile(pageDataPath, pageData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send('success');
});



module.exports = router;
