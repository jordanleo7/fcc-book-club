import React from 'react';
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
    >
      {({ loading, error, data }) => {
        if (loading) return <div className="loading">Loading</div>;
        if (error) return <p className="error">Error</p>;
        return data.books.map((book) => (
          <div key={book.title} className="book--container">
            <Link to={`/book/${book.id}`}><div className="book--placeholder-book-cover">
              <span className="book--placeholder-book-cover-title">{book.title}</span>
            </div></Link>
            {/*<div>
              <span><Link to={`/book/${book.id}`}>{book.title}</Link></span>
              <span>by {book.author}</span>
            </div>*/}
          </div> 
        ));
      }}
  </Query>
);

export default AllBooks