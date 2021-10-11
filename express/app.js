const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');

// Config
const port = 4000;
const dataPath = './src/data/blocks.json';

/*
 * Middleware
 */
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
 * Blocks API
 */
app.post('/blocks', (req, res) => {
	// Get existing blocks data.
  const blocksJson = fs.existsSync(dataPath) ? fs.readFileSync(dataPath) : null;
  let blocksData = blocksJson ? JSON.parse(blocksJson) : [];

  // Add data for new block.
	const moduleData = {
		'id': `block-${blocksData.length + 1}`,
		'type': req.body.type,
		'text': req.body.text
	}
	blocksData.push(moduleData);

	// Write JSON to file.
  jsonfile.writeFile(dataPath, blocksData, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });

  res.send(moduleData);
})
