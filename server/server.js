const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const sh = require('shorthash');

var {mongoose} = require('./db/mongoose');
var {Url} = require('./models/url');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


// POST a new URL
app.post('/urls', (req, res) => {

  var hash = sh.unique(req.body.originalUrl);

  var url = new Url({
    title: req.body.title,
    originalUrl: req.body.originalUrl,
    tags: req.body.tags,
    hashedUrl: hash,
    createdAt: new Date().toString()
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


// GET URL by hash
app.get('/urls/hashed/:hash', (req, res) => {
  var hash = req.params.hash;

  Url.findOne({
    hashedUrl: hash
  }).then((url) => {
    if (!url) {
      res.status(400).send();
    }

    res.send({url})
  }).catch((e) => console.log('not found'));
})

// PATCH a URL by ID
app.patch('/urls/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['title', 'originalUrl', 'tags']);

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


// DELETE a URL by ID
app.delete('/urls/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(404).send('Not valid');
  }

  Url.findByIdAndDelete(id).then((url) => {
    if (!url) {
      res.status(404).send();
    }

    res.send({url});
  }).catch((e) => console.log('not valid'));
});


app.listen(port, () => {
  console.log('Listening on port ' + port);
});
