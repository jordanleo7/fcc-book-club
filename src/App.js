import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Home from "./components/Home";
import AllBooks from "./components/AllBooks";
import Nav from "./components/Nav";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Nav/>
            <Route exact path="/" component={Home}/>
            <Route path="/allbooks" component={AllBooks}/>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
