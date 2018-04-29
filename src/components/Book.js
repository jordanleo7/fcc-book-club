import React, { Component } from 'react';
import { Query, Mutation, graphql } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { requestBook } from "../queries";

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
          requestedBy {
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
          <span>Request this book from {data.book.ownedBy.username}</span>
            <Mutation mutation={requestBook}>
              {(requestBook) => (
                <button 
                  onClick={() => {
                    console.log('request', data);
                    requestBook({
                      variables: { id: data.book.id }
                    })
                  }}
                >
                  Request
                </button>
              )}
            </Mutation>
          </div> 
        );
      }}
  </Query>
);

export default graphql(requestBook)(Book)
//export default Book