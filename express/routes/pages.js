const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');
const pagesDataPath = './src/data/pages.json';

// Post pages.
router.post('/pages', (req, res) => {
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
		'text': req.body.text
	}
	pagesData[pageId] = pageData;

	// Write JSON to file.
  jsonfile.writeFile(pagesDataPath, pagesData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send(pageData);
});

module.exports = router;
