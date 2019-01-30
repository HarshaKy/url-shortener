const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db = {
  localhost: 'mongodb://localhost:27017/UrlShort',
  mlab: 'mongodb://<username>:<password>@ds247410.mlab.com:47410/shrt'
};
mongoose.connect((process.env.PORT ? db.mlab : db.localhost), {useNewUrlParser: true});

module.exports = {mongoose};


//asdf
