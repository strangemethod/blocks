const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');
const Models = require('../models/models.js');
const PATHS = require('../constants.js');
const FUNCT = require('../functions.js');


/*
 * Add block endpoint.
 * @param page {string} name of json file containing the block.
 * @param images {array} images to write to block.
 */
router.post('/add-block', (req, res) => {
  FUNCT.writeBlocksData(req.body.title, req.body.images);
  res.send({'success': true});
});


/*
 * Delete block endpoint.
 * @param page {string} name of json file containing the block.
 * @param index {number} array index of block.
 */
router.post('/delete-block', (req, res) => {
  FUNCT.deleteBlock(req.body.page, req.body.index);
  res.send({'success': true});
});

/*
 * Delete block endpoint.
 * @param page {string} name of json file containing the block.
 * @param index {number} array index of block.
 * @param delta {number} number of integers to move index (-1 or 1).
 */
router.post('/order-block', (req, res) => {
  FUNCT.orderBlock(req.body.page, req.body.index, req.body.delta);
  res.send({'success': true});
});



module.exports = router;
