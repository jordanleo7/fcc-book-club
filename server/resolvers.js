const books = [{
  id: 1,
  name: 'book1'
},{
  id: 2,
  name: 'book2'
}];
let nextId = 3;

const resolvers = {
  Query: {
    books: () => {
      return books;
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { id: nextId++, name: args.name };
      books.push(newBook);
      return newBook;
    }
  }
}

module.exports = resolvers;