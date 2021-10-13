const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const jsonfile = require('jsonfile');
const fs = require('fs');

// Config
const port = 4000;

// Routes
const blocksRouter = require('./routes/pages');
const pagesRouter = require('./routes/pages');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// Routes.
app.use('/', blocksRouter);
app.use('/', pagesRouter);


