const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = newSchema({
  username: String,
  fullname: String,
  city: String,
  state: String,
  inventory: Array
})
module.exports = mongoose.model('book-trading-club-user', userSchema);