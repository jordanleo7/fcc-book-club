import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const Book = (props) => (
  <Query 
    query={gql`
      query book($id: String!) {
        book(id: $id) {
          id
          title
          author
          summary
          cover
          ownedBy {
            id
            username
          }
        }
      }
    `}
    variables={{ id: props.match.params.id }}
    >
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return <p>Loading</p>;
        if (error) return <p>Error</p>;
        return (
          <div>
          <h3>Book</h3>
          <p>Title: {data.book.title}</p>
          <p>Author: {data.book.author}</p>
          <p>Summary: {data.book.summary}</p>
          <span>Request this book from {data.book.ownedBy[0].username}</span>
          </div> 
        );
      }}
  </Query>
);

export default Book