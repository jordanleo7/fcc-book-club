import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
//import { WebSocketLink } from 'apollo-link-ws';
import Nav from "./components/Nav";
import Home from "./components/Home";
import AllBooks from "./components/AllBooks";
import Book from "./components/Book";
import AddBook from "./components/AddBook";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

const client = new ApolloClient({
  link: new HttpLink({ 
    uri: "/graphql", 
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache()
});

/* Subscription 
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  client,
);
*/

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Nav/>
            <Route exact path="/" component={Home}/>
            <Route path="/allbooks" component={AllBooks}/>
            <Route path="/book/:id" component={Book}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/editprofile" component={EditProfile}/>
            <Route path="/addbook" component={AddBook}/>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
