var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
  newsId: { type: String, unique: true, index: true },
  title: String,
  author: String,
  brief: String,
  ctime: { type: Date, default: Date.now },
  utime: { type: Date, default: Date.now },
  pic: String,
  content: String,
  parrentNav: String,
  views: { type: Number, default: 0 }
});

module.exports = mongoose.model('News', newsSchema);