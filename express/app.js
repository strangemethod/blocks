const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');

// Config
const port = 4000;
const blocksDataPath = './src/data/blocks.json';
const pagesDataPath = './src/data/pages.json';

/*
 * Middleware
 */
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


/*
 * Post pages.
 */
app.post('/pages', (req, res) => {
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


/*
 * Post blocks.
 */
app.post('/blocks', (req, res) => {
	// Get existing blocks data.
  const blocksJson = fs.existsSync(blocksDataPath) ? fs.readFileSync(blocksDataPath) : null;
  let blocksData = blocksJson ? JSON.parse(blocksJson) : [];

  // Add data for new block.
	const blockData = {
		'id': `block-${blocksData.length + 1}`,
		'type': req.body.type,
		'text': req.body.text
	}
	blocksData.push(blockData);

	// Write JSON to file.
  jsonfile.writeFile(blocksDataPath, blocksData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send(blockData);
});
