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
          <div key={data.book.title}>
          <p>{data.book.title}</p><p>by {data.book.author}</p>
          </div> 
        );
      }}
  </Query>
);

export default Book