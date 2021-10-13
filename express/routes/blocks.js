const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');
const blocksDataPath = './src/data/blocks.json';

// Post blocks.
router.post('/blocks', (req, res) => {
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

module.exports = router;
