import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { signedInUser, signedInUsersBooks, acceptBookRequest, denyBookRequest } from '../queries';

class PendingRequests extends Component {

  PendingRequests() {
    if (this.props.signedInUsersBooks.loading || this.props.signedInUser.loading) return <p className="loading">Loading</p>;
    if (this.props.signedInUsersBooks.error || this.props.signedInUser.error) return <p className="error">Error</p>;
    if (this.props.signedInUsersBooks.signedInUsersBooks && this.props.signedInUser.signedInUser) {

      return (
        <div className="profile--container">
          <div>
            <h3>Pending Book Requests</h3>
              <ul>
                {
                  this.props.signedInUsersBooks.signedInUsersBooks.map((book, index) => {
                    if (book.requestedBy) {
                      return (
                        <li key={index}> 
                          <div>{book.requestedBy.username} from {book.requestedBy.city}, {book.requestedBy.myState} requested {book.title} from you.</div>
                          <div>            
                            <Mutation mutation={acceptBookRequest}>
                              {(acceptBookRequest) => (
                                <button
                                  className="button--yes button--padding"  
                                  onClick={() => {
                                    alert(`Sending ${book.title} to ${book.requestedBy.username}.`);
                                    acceptBookRequest({
                                      variables: { id: book.id, requestedBy: book.requestedBy.id },
                                      refetchQueries: [{ 
                                        query: signedInUsersBooks, 
                                        variables: {name: "signedInUsersBooks"}
                                      }],
                                    })
                                  }}
                                >
                                  Accept
                                </button>
                              )}
                            </Mutation>

                            <Mutation mutation={denyBookRequest}>
                              {(denyBookRequest) => (
                                <button
                                  className="button--no button--padding float-right" 
                                  onClick={() => {
                                    alert(`${book.requestedBy.username}'s request has been declined`);
                                    console.log('decline request', book);
                                    denyBookRequest({
                                      variables: { id: book.id },
                                      refetchQueries: [{ 
                                        query: signedInUsersBooks, 
                                        variables: {name: "signedInUsersBooks"}
                                      }],
                                    })
                                  }}
                                >
                                  Decline
                                </button>
                              )}
                            </Mutation></div>
                        </li>
                      )
                    } else { return null }
                  })
                }
              </ul>
          </div>
        </div>
      );
    }
    return (<p>Please log in</p>);
  }

  render() {
    return (
      <div>
        {this.PendingRequests()}
      </div>
    )
  }

}

export default compose(
  graphql(gql`
   { signedInUsersBooks {
    id
    title
    author
    summary
    cover
    ownedBy {
      id
      username
      city
      myState
    }
    requestedBy {
      id
      username
      city
      myState
    }}
  }
  `, {name: "signedInUsersBooks"}),
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
  graphql(acceptBookRequest),
  graphql(denyBookRequest)
)(PendingRequests)
