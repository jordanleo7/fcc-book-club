import React, { Component } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

const Books = () => (
  <Query query={gql`
    {
      books {
        title
      }
    }
    `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading</p>;
        if (error) return <p>Error</p>;
        console.log(data);
        return data.books.map((book) => (
          <div key={book.title}>
          <p>{`book title: ${book.title}`}</p>
          </div> 
        ));
      }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app</h2>
          <Books />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
