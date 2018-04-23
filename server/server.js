const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const bodyParser = require('body-parser');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
// Create GraphQL Schema
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const myGraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

const PORT = 4000;
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// mongoose
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}))

const pubsub = new PubSub();
module.exports = pubsub;
const websocketServer = createServer(server);

// Wrap the Express server
websocketServer.listen(PORT, () => {
  console.log(`Apollo Server is now running on http://localhost:${PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema: myGraphQLSchema
  }, {
    server: websocketServer,
    path: '/subscriptions',
  });
})