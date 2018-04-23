const Book = require('./Book');
const User = require('./User');

const resolvers = {
  Query: {
    books() {
      return Book.find({});
    }
  },
  Mutation: {
    addBook: (obj, args) => {
      const newBook = new Book({ 
        title: args.title, 
        author: args.author 
      });
      return newBook.save();
    },
    addUser: (obj, args) => {
      const newUser = new User({
        username: args.username
      });
      return newUser.save();
    }
  }
}

module.exports = resolvers;