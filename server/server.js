const express = require('express');
require('dotenv').config();
const { graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const schema = require('./schema');
const mongoose = require('mongoose');

const PORT = 4000;
const server = express();

server.use('*', cors({ origin: `http://localhost:${PORT}`}));

// mongoose
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

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
    schema
  }, {
    server: websocketServer,
    path: '/subscriptions',
  });
})