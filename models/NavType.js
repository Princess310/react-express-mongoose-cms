var mongoose = require('mongoose');

var navTypeSchema = new mongoose.Schema({
  navTypeId: { type: String, unique: true, index: true },
  name: String,
  type: String,
  pid: String,
  ctime: { type: Date, default: Date.now },
  utime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NavType', navTypeSchema);