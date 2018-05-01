import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import Home from "./components/Home";
import AllBooks from "./components/AllBooks";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Book from "./components/Book";

const client = new ApolloClient({
  link: new HttpLink({ 
    uri: 'http://localhost:4000/graphql', 
    credentials: 'include',
    clientState: {

    }
  }),
  cache: new InMemoryCache()
});
/*
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
          <div style={{margin: '0 16px'}}>
            <Nav/>
            <div style={{clear: 'both'}}>
            <Route exact path="/" component={Home}/>
            <Route path="/allbooks" component={AllBooks}/>
            <Route path="/book/:id" component={Book}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/editprofile" component={EditProfile}/>
            </div>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
