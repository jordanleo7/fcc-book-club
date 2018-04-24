import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

const bookSearchQuery = gql`
  query {
    book(title: String!) {
      title
      author
      summary
    }
  }
`

const BookSearch = () => (
  <Query query={bookSearchQuery}>
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

export default BookSearch