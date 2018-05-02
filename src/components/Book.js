import React from 'react';
import { Query, Mutation, graphql } from 'react-apollo';
import gql from "graphql-tag";
import { requestBook } from "../queries";

const bookContainer = {
  padding: '8px',
  textAlign: 'center'
}

const placeholderBookCover = {
  height: '150px',
  width: '100px',
  background: '#384253',
  margin: '0 auto'
}

const buttonApprove = {
  backgroundColor: 'none',
  border: 'none',
  fontSize: '1em',
  padding: '0',
  margin: '0',
  color: '#4396C4',
  cursor: 'pointer'
}

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
          <div style={bookContainer}>
          <h3>Book</h3>
          <div style={placeholderBookCover}></div>
          <p>Title: {data.book.title}</p>
          <p>Author: {data.book.author}</p>
          <p>Summary: {data.book.summary}</p>
            <Mutation mutation={requestBook}>
              {(requestBook) => (
                <button 
                  style={buttonApprove}
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
            <span> this book from {data.book.ownedBy.username}</span>
          </div> 
        );
      }}
  </Query>
);

export default graphql(requestBook)(Book)
//export default Book