import React from 'react';
import { Query, Mutation, graphql } from 'react-apollo';
import gql from "graphql-tag";
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
        if (loading) return <p className="loading">Loading</p>;
        if (error) return <p className="error">Error</p>;
        return (
          <div className="bookview--padding-container">
            <h3>Book</h3>
            <div className="bookview--container">
            <div className="book--placeholder-book-cover">
              <span>{data.book.title}</span>
            </div>
            <ul>
              <li><h6>Title</h6>{data.book.title}</li>
              <li><h6>Author</h6>{data.book.author}</li>
              <li><h6>Summary</h6>{data.book.summary}</li>
            </ul>
            <Mutation mutation={requestBook}>
                {(requestBook) => (
                  <div>
                  <button 
                    className="button--yes button--padding"
                    onClick={() => {
                      alert(`You have requested ${data.book.title} from ${data.book.ownedBy.username}.`);
                      console.log('request', data);
                      requestBook({
                        variables: { id: data.book.id }
                      })
                    }}
                  >
                    Request
                  </button>
                  {loading && <p>Loading...</p>}
                  {error && <p>Error :( Please try again</p>}
                  </div>
                )}
              </Mutation>
              {" "}this book from {data.book.ownedBy.username}
            </div> 
          </div>
        );
      }}
  </Query>
);

export default graphql(requestBook)(Book)
