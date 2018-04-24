const typeDefs = `

type User {
  id: ID
  googleId: String
  username: String
  givenName: String
  familyName: String
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
  user: User
  users: [User]
  book: Book
  books: [Book]
}

type Mutation {
  addUser(username: String!, givenName: String!, familyName: String!, city: String, state: String): User
  editUser(username: String!, givenName: String!, familyName: String!, city: String, state: String): User
  addBook(title: String!, author: String!, summary: String!, cover: String): Book
  editBook(title: String!, author: String!, summary: String!, cover: String): Book
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
