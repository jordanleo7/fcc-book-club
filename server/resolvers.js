const Book = require('./Book');
const User = require('./User');

const resolvers = {
  User: {
    inventory(oid) { 
      return Book.find({ _id: oid.inventory }) 
    }
  },
  Book: {
    ownedBy(oid) {
      return User.findOne({ _id: oid.ownedBy })
    },
    requestedBy(oid) {
      return User.findOne({ _id: oid.requestedBy })
    }
  },
  Query: {
    users() {
      return User.find({});
    },
    signedInUser(obj, args, context) {
      if (context.user) {
        return User.findById(context.user._id);
      } else {
        return null
      }
    },
    books() {
      return Book.find({});
    },
    book(obj, args) {
      console.log('book args: ', args)
      return Book.findById(args.id);
    }
  },
  Mutation: {
    addUser: (obj, args) => {
      const newUser = new User({
        username: args.username,
        givenName: args.givenName,
        familyName: args.familyName,
        city: args.city,
        myState: args.myState
      });
      return newUser.save();
    },
    editUser: (obj, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user._id,
          {
            $set: {
              username: args.username,
              givenName: args.givenName,
              familyName: args.familyName,
              city: args.city,
              myState: args.myState
            }
          }, { new: true }
        )
      } else {
        return null
      }
    },
    addBook: (obj, args, context) => {
      if (context.user) {
        const newBook = new Book({ 
          title: args.title, 
          author: args.author,
          summary: args.summary,
          cover: args.cover,
          ownedBy: context.user._id
        });
        return newBook.save().then((newBook) => {
          return User.findByIdAndUpdate(context.user._id,
            { $push: { inventory: newBook._id }
            }
          )
        })
      }
    }, // requestBook(id: String!): Book
    requestBook: (obj, args, context) => {
      console.log('reqbook:',obj, args, context.user);

      if (context.user) {

        return Book.findById(args.id, (err, book) => {
          if (err) return err;
          book.requestedBy = context.user._id;
          return book.save();
        })

      }

    }
  },
  /*Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('bookAdded')
    }
  }*/
}

module.exports = resolvers;
