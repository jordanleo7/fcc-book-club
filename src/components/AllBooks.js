import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

const AllBooks = () => (
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
        return data.books.map((book) => (
          <div key={book.title}>
          <p>{`book title: ${book.title}`}</p>
          </div> 
        ));
      }}
  </Query>
);

export default AllBooks