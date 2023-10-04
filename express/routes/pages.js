const AWS = require('aws-sdk');
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
  FUNCT.writePageData(req.body.title, req.body.images);
  res.send({'success': true});
});

/*
 * Get S3 bucket data.
 * @param bucket {string}
 */
router.post('/get-s3-bucket', (req, res) => {
  AWS.config.update({region: 'us-west-1'});
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});

  const listObjectsPromise = s3.listObjects({
      Bucket: req.body.bucket,
      Prefix: req.body.folder
  }).promise();

  listObjectsPromise.then(function(data) {
    res.send(data.Contents)
  }).catch(function(err) {
    res.send(err)
  });
});

module.exports = router;
