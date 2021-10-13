const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');
const dataPath = './src/data/blocks/';

// Post blocks.
router.post('/blocks', (req, res) => {
	const blocksDataPath = `${dataPath}${req.body.page}.json`;

	// Get existing blocks data.
  const blocksJson = fs.existsSync(blocksDataPath) ? fs.readFileSync(blocksDataPath) : null;
  let blocksData = blocksJson ? JSON.parse(blocksJson) : {};
  const blocksCount = Object.keys(blocksData).length;

  // Add data for new block.
  const blockKey = `block-${blocksCount + 1}`;
	const blockData = {
		'type': req.body.type,
		'text': 'hardcoded text'
	}
	blocksData[blockKey] = blockData;

	// Write JSON to file.
  jsonfile.writeFile(blocksDataPath, blocksData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send(blockData);
});

module.exports = router;
