import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const placeholderBookCover = {
  height: '150px',
  width: '100px',
  background: '#384253',
  margin: '0 auto'
}

const listItemStyling = {
  width: '250px',
  margin: '8px',
  padding: '8px',
  display: 'inline-block',
  background: '#FFF',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
}

const listItemTitle = {
  color: '#4396C4',
  textDecoration: 'none',
  margin: '8px 0 0 0'
}

const listItemAuthor = {
  color: 'gray',
  textDecoration: 'none',
  margin: '8px 0 0 0'
}

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
        if (loading) return <div>Loading</div>;
        if (error) return <p>Error</p>;
        return data.books.map((book) => (
          <div key={book.title} style={listItemStyling}>
            <Link to={`/book/${book.id}`}><div style={placeholderBookCover}></div></Link>
            <div style={listItemTitle}>
            <Link to={`/book/${book.id}`} style={listItemTitle}>{book.title}</Link><p style={listItemAuthor}>by {book.author}</p>
            </div>
          </div> 
        ));
      }}
  </Query>
);

export default AllBooks