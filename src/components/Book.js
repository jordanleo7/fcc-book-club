import React, { Component } from 'react';
import { compose, Query, Mutation, graphql } from 'react-apollo';
import gql from "graphql-tag";
import { signedInUser, requestBook } from "../queries";

class Book extends Component {

  SingleBook() {
    if (this.props.book.loading || this.props.signedInUser.loading) return <p className="loading">Loading</p>;
    if (this.props.book.error || this.props.signedInUser.error) return <p className="error">Error</p>;
    if (this.props.book.book && this.props.signedInUser) {
      return (
        <div className="bookview--padding-container">
          <h3>Book</h3>
          <div className="bookview--container">
          <div className="book--placeholder-book-cover">
            <span className="book--placeholder-book-cover-title">{this.props.book.book.title}</span>
          </div>
          <ul>
            <li><h6>Title</h6>{this.props.book.book.title}</li>
            <li><h6>Author</h6>{this.props.book.book.author}</li>
            <li><h6>Summary</h6>{this.props.book.book.summary}</li>
          </ul>

          { !this.props.signedInUser.signedInUser
            ? (<div>
                <p className="book--notice">This book is owned by {this.props.book.book.ownedBy.username}</p>
                <p className="book--notice"><a href={"/auth/google"} className="button--yes">Sign in</a> to request books</p>
              </div>
            )
            : this.props.signedInUser.signedInUser.id === this.props.book.book.ownedBy.id
              ? <p className="book--notice">This is your book</p>
              : (<Mutation mutation={requestBook}>
                  {(requestBook) => (
                    <div>
                      <button 
                        className="button--yes button--padding"
                        onClick={() => {
                          alert(`You have requested ${this.props.book.book.title} from ${this.props.book.book.ownedBy.username}.`);
                          requestBook({
                            variables: { id: this.props.book.book.id }
                          })
                        }}
                      >
                        Request
                      </button>
                      <div className="helper--inline">{" "}this book from {this.props.book.book.ownedBy.username}</div>
                    </div>
                  )}
                </Mutation>
                )
          }

          </div> 
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.SingleBook()}
      </div>
    )

  }
}

export default compose(
  graphql(gql`
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
  `, {name: "book", options: (props) => ({variables: { id: props.match.params.id } }) }),
  graphql(gql`
  {
    signedInUser {
      id
      googleId
      username
      givenName
      familyName
      city
      myState
    }
  }
  `, {name: "signedInUser"}),
  graphql(requestBook)
)(Book)
