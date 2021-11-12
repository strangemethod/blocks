const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');
const Models = require('../models/models.js');
const pagesDataPath = './src/data/pages.json';
const blocksPath = './src/data/blocks/';

// Post pages.
router.post('/add-page', (req, res) => {
	// Get existing blocks data.
  const pagesJson = fs.existsSync(pagesDataPath) ? fs.readFileSync(pagesDataPath) : null;
  let pagesData = pagesJson ? JSON.parse(pagesJson) : [];
	const pageId = req.body.id;

	if (pagesData[pageId]) {
		return res.status(400).send({
		  message: 'This is an error!'
		});
	}

  // Add data for new block.
	const pageData = {
		'title': req.body.title,
	}
	pagesData[pageId] = pageData;

	// Write to pages.json.
  jsonfile.writeFile(pagesDataPath, pagesData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  // Create JSON file for page blocks.
  const blocksFilePath = blocksPath + pageId + '.json';
  const initialBlocks = {};
  const initialBlock = Models.hero;

  initialBlock.text = req.body.title;
  initialBlocks['block-1'] = initialBlock;
  
  jsonfile.writeFile(blocksFilePath, initialBlocks, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send(pageData);
});

module.exports = router;
