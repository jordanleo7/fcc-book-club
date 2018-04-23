import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


client.query({
  query: gql`
    {
      books {
        name
      }      
    }
  `
}).then(result => console.log(result));

const Books = () => (
  <Query query={gql`
    {
      books {
        name
      }
    }
    `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading</p>;
        if (error) return <p>Error</p>;
        return data.books.map((book) => (
          <div key={book.name}>
          <p>{`book name: ${book.name}`}</p>
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
