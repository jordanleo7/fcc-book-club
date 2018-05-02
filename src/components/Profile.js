import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { signedInUser, signedInUsersBooks, acceptBookRequest, denyBookRequest } from '../queries';

class Profile extends Component {

  SignedInUser() {
    console.log(this.props,'signedInUsersBooks:',this.props.signedInUsersBooks.signedInUsersBooks, 'signedInUser:',this.props.signedInUser.signedInUser);
    if (this.props.signedInUsersBooks.loading || this.props.signedInUser.loading) return <p>Loading</p>;
    if (this.props.signedInUsersBooks.error || this.props.signedInUser.error) return <p>Error</p>;
    if (this.props.signedInUsersBooks && this.props.signedInUser) {

      return (
        <div className="profile--container">
          <div className="profile--info">
            <h3>My Profile</h3>
            <ul>
              <li>{this.props.signedInUser.signedInUser.username}</li>
              <li>{this.props.signedInUser.signedInUser.givenName} {this.props.signedInUser.signedInUser.familyName}</li>
              <li>{this.props.signedInUser.signedInUser.city}, {this.props.signedInUser.signedInUser.myState}</li>
            </ul>
            <Link to={"/editprofile"}>Update</Link>
          </div>
          <div className="profile--books">
            <h3>My Books</h3>
            <ul>
              {this.props.signedInUsersBooks.signedInUsersBooks.map((book) => (
                <li key={book.title}>
                  <Link to={`/book/${book.id}`}>{book.title}</Link> by {book.author}
                </li> 
              ))}
            </ul>
            <Link to={"/addbook"}>Add Book</Link>
          </div>
          <div className="bookrequests--container">
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
                                  className="button--yes"  
                                  onClick={() => {
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
                            {" | "}
                            <Mutation mutation={denyBookRequest}>
                              {(denyBookRequest) => (
                                <button
                                  className="button--no" 
                                  onClick={() => {
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
        {this.SignedInUser()}
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
)(Profile)


/* I wish these worked, but they only load 1 of the 2 queries:

export default compose(
  graphql(signedInUsersBooks),
  graphql(signedInUser),
  graphql(acceptBookRequest),
  graphql(denyBookRequest)
)(Profile)

or 

export default compose(
  graphql(signedInUsersBooks, {name: signedInUsersBooks}),
  graphql(signedInUser, {name: signedInUser}),
  graphql(acceptBookRequest),
  graphql(denyBookRequest)
)(Profile)

*/
