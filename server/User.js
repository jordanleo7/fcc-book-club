const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: String,
  username: String,
  givenName: String,
  familyName: String,
  city: String,
  myState: String
  //inventory: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})
module.exports = mongoose.model('book-trading-club-user', userSchema);