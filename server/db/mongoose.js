const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UrlShort', {useNewUrlParser: true});

module.exports = {mongoose};
