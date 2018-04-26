const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: String,
  author: String,
  summary: String,
  cover: String,
  ownedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})
module.exports = mongoose.model('book-trading-club-book', bookSchema);