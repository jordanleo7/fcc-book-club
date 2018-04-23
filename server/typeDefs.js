const typeDefs = `

type User {
  username: String
  fullname: String
  city: String
  location: String
}

type Book {
  title: String
  author: String
  summary: String
  cover: String
}

type Query {
  books: [Book]
}

type Mutation {
  addBook(title: String!, author: String, summary: String, cover: String): Book
  addUser(username: String!): User
}

`;

module.exports = typeDefs;
