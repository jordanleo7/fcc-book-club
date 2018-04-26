import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const AllBooks = () => (
  <Query query={gql`
    {
      books {
        id
        title
        author
        summary
        cover
      }
    }
    `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading</p>;
        if (error) return <p>Error</p>;
        return data.books.map((book) => (
          <div key={book.title}>
          <Link to={`/book/${book.id}`}>{book.title}</Link><p>by {book.author}</p>
          </div> 
        ));
      }}
  </Query>
);

export default AllBooks