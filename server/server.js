const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Url} = require('./models/url');

var app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/urls', (req, res) => {
  var url = new Url({
    title: req.body.title,
    originalUrl: req.body.originalUrl,
    tags: req.body.tags
  });

  url.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/urls', (req, res) => {
  Url.find().then((urls) => {
    res.send({urls});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
