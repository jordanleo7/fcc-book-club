const express = require('express');
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { graphql, execute, subscribe } = require('graphql');
const jwt = require('jsonwebtoken');
// Create GraphQL Schema
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({ typeDefs, resolvers });
const User = require('./User');
const PORT = 4000;
const app = express();

//const SECRET = process.env.SESSION_COOKIE_KEY;
/*const addUser = async (req) => {
  const token = req.headers.authorization;
  /*try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch (err) {
    console.log(err);
  }
  req.next();
};
*/

//app.use(addUser);
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));
//app.use(cors()); //'*', cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  // 24 hour session
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_COOKIE_KEY]
}));

// Initialize Passport
require('./passport');
app.use(passport.initialize());
app.use(passport.session());
const authRouter = require('./authRouter');
app.use('/', authRouter);

// Mongoose MongoDB
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Apollo GraphQL Server
app.use(
  '/graphql', 
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: { 
      user: req.user 
    } 
  }))
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}))

const pubsub = new PubSub();
module.exports = pubsub;

// Wrap the Express server
const websocketServer = createServer(app);

websocketServer.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    schema,
    execute,
    subscribe
  }, {
    server: websocketServer,
    path: '/subscriptions',
  });
})
