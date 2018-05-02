const typeDefs = `

type User {
  id: ID
  googleId: String
  username: String
  givenName: String
  familyName: String
  city: String
  myState: String
}

type Book {
  id: ID
  title: String
  author: String
  summary: String
  cover: String
  ownedBy: User
  requestedBy: User
}

type Query {
  user: User
  users: [User]
  signedInUser: User
  signedInUsersBooks: [Book]
  book(id: String!): Book
  books: [Book]
}

type Mutation {
  addUser(username: String!, givenName: String!, familyName: String!, city: String, myState: String): User
  editUser(username: String!, givenName: String!, familyName: String!, city: String, myState: String): User
  addBook(title: String!, author: String!, summary: String!, cover: String, ownedBy: String): Book
  editBook(title: String!, author: String!, summary: String!, cover: String, ownedBy: String): Book
  requestBook(id: String!): Book
  acceptBookRequest(id: String!, requestedBy: String!): Book
  denyBookRequest(id: String!): Book
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
