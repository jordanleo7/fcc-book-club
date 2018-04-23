const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = newSchema({
  title: String,
  author: String,
  summary: String,
  cover: String
})
module.exports = mongoose.model('book-trading-club-book', bookSchema);