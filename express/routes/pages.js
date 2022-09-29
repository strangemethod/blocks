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
  FUNCT.writeBlocksData(req.body.title);
  FUNCT.writePageData(req.body.title);
  res.send(pageData);
});

module.exports = router;
