const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs-extra');
const Models = require('../models/models.js');
const PATHS = require('../constants.js');
const FUNCT = require('../functions.js');


/*
 * Post a new page.
 * @param title {string}
 */
router.post('/add-page', (req, res) => {
  const pageId = req.body.title.replace(/\s+/g, '-').toLowerCase();;
  let pagesData = FUNCT.getPagesData();

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
  jsonfile.writeFile(PATHS.pagesData, pagesData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  // Copy image directory to dist.
  const fullContentSrc = `${PATHS.contentSrc}${pageId}/`;
  const fullContentDest = `${PATHS.contentDest}${pageId}/`;
  
  if (!fs.existsSync(PATHS.contentDest)) fs.mkdirSync(PATHS.contentDest);
  if (!fs.existsSync(fullContentDest)) fs.mkdirSync(fullContentDest);

  fs.copy(fullContentSrc, fullContentDest, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Image folder created: ${fullContentDest}`);
    }
  });

  // Create JSON file for page blocks.
  const blocksFilePath = `${PATHS.blocksData}${pageId}.json`;

  const images = fs.readdirSync(fullContentSrc).filter((imagePath) => {
    if (imagePath[0] !== '.') return imagePath;
  }).map((imagePath) => {
    let imageBlock = [{
      'caption': Models.image.caption,
      'src': `${PATHS.prodContent}${pageId}/${imagePath}`,
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
