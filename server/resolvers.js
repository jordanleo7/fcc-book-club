const Book = require('./Book');
const User = require('./User');

const resolvers = {
  Query: {
    users() {
      return User.find({});
    },
    signedInUser(obj, args, context) {
      console.log('hello', context.user);
      if (context.user) {
        console.log(User.findOne({ _id: context.user._id }))
        return User.findOne({ _id: context.user._id });
      } else {
        return null
      }
    },
    books() {
      console.log(Book.find({}))
      return Book.find({});
    }
  },
  Mutation: {
    addUser: (obj, args) => {
      const newUser = new User({
        username: args.username,
        givenName: args.givenName,
        familyName: args.familyName,
        city: args.city,
        state: args.state
      });
      return newUser.save();
    },
    addBook: (obj, args) => {
      const newBook = new Book({ 
        title: args.title, 
        author: args.author,
        summary: args.summary,
        cover: args.cover
      });
      return newBook.save();
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('bookAdded')
    }
  }
}

module.exports = resolvers;