const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs-extra');
const Models = require('../models/models.js');
const blocksPath = './src/data/blocks/';
const contentSrcPath = './content/';
const contentDestPath = `./dist/assets/img/`;
const prodContentPath = `/assets/img/`;
const pagesDataPath = './src/data/pages.json';

// Post pages.
router.post('/add-page', (req, res) => {
	// Get existing blocks data.
  const pagesJson = fs.existsSync(pagesDataPath) ? fs.readFileSync(pagesDataPath) : null;
  let pagesData = pagesJson ? JSON.parse(pagesJson) : [];
	const pageId = req.body.title.replace(/\s+/g, '-').toLowerCase();;

	if (pagesData[pageId]) {
		return res.status(400).send({
		  message: 'A page already exists with this ID.'
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

  // Copy image directory to dist.
  const fullContentSrc = `${contentSrcPath}${pageId}/`;
  const fullContentDest = `${contentDestPath}${pageId}/`;
  
  if (!fs.existsSync(contentDestPath)) fs.mkdirSync(contentDestPath);
  if (!fs.existsSync(fullContentDest)) fs.mkdirSync(fullContentDest);

  fs.copy(fullContentSrc, fullContentDest, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Image folder created: ${fullContentDest}`);
    }
  });

  // Create JSON file for page blocks.
  const blocksFilePath = `${blocksPath}${pageId}.json`;

  const images = fs.readdirSync(fullContentSrc).filter((imagePath) => {
    if (imagePath[0] !== '.') return imagePath;
  }).map((imagePath) => {
    let imageBlock = [{
      'caption': Models.image.caption,
      'src': `${prodContentPath}${pageId}/${imagePath}`,
      'type': Models.image.type
    }];
    return imageBlock;
  });
  
  jsonfile.writeFile(blocksFilePath, images, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send(pageData);
});

module.exports = router;
