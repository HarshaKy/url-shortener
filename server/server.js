const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Url} = require('./models/url');

var app = express();
const port = 3000;

app.use(bodyParser.json());


// POST a new URL
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


// GET all URLs
app.get('/urls', (req, res) => {
  Url.find().then((urls) => {
    res.send({urls});
  }, (e) => {
    res.status(400).send(e);
  });
});


// GET a URL by ID
app.get('/urls/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(404).send('Not valid');
  }

  Url.findById(id).then((url) => {
    if (!url) {
      res.status(404).send();
    }
    res.send({url});
  }).catch((e) => console.log('Invalid'));
});


// PATCH a URL by ID
app.patch('/urls/:id', (req, res) => {
  var id = req.params.id;
  var newTitle = req.body.title;
  var newOriginalUrl = req.body.originalUrl;
  var newTags = req.body.tags;
  var body = _.pick(req.body, ['title', 'originalUrl', 'tags']);

  // console.log(newTitle);
  // console.log(body);

  if (!ObjectId.isValid(id)) {
    res.status(404).send('Not valid');
  }

  Url.findByIdAndUpdate(id, {$set: body}, {new: true}).then((url) => {
    if (!url) {
      return res.status(400).send();
    }

    res.send({url});
  }).catch((e) => console.log('Not valid'));
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
