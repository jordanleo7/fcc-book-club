const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');

const { resolvers } = require('./resolvers');
const { constant } = require('async');

const typeDefs = `

type Book {
  id: ID!
  name: String!
}

type Query {
  books: [Book]
}

type Mutation {
  addBook(name: String!): Book
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
