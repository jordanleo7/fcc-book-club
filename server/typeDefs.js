const typeDefs = `

type User {
  id: ID
  username: String
  fullname: String
  city: String
  state: String
}

type Book {
  id: ID
  title: String
  author: String
  summary: String
  cover: String
}

type Query {
  users: [User]
  books: [Book]
}

type Mutation {
  addUser(username: String!, fullname: String!, city: String!, state: String!): User
  addBook(title: String!, author: String!, summary: String!, cover: String): Book
}

type Subscription {
  bookAdded(repoName: String!): Book
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

`;

module.exports = typeDefs;
