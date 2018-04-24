const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: String,
  username: String,
  givenName: String,
  familyName: String,
  city: String,
  state: String
})
module.exports = mongoose.model('book-trading-club-user', userSchema);