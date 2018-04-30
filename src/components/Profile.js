import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { signedInUser, signedInUsersBooks, acceptBookRequest } from '../queries';
import AddBook from './AddBook';

class Profile extends Component {

  SignedInUser() {
    console.log(this.props,'signedInUsersBooks:',this.props.signedInUsersBooks.signedInUsersBooks, 'signedInUser:',this.props.signedInUser.signedInUser);
    if (this.props.signedInUsersBooks.loading || this.props.signedInUser.loading) return <p>Loading</p>;
    if (this.props.signedInUsersBooks.error || this.props.signedInUser.error) return <p>Error</p>;
    if (this.props.signedInUsersBooks && this.props.signedInUser) {

      return (
        <div>
          <div>
            <h3>My Profile</h3>
            <ul>
              <li>{this.props.signedInUser.signedInUser.username}</li>
              <li>{this.props.signedInUser.signedInUser.givenName} {this.props.signedInUser.signedInUser.familyName}</li>
              <li>{this.props.signedInUser.signedInUser.city}, {this.props.signedInUser.signedInUser.myState}</li>
            </ul>
          </div>
          <Link to={"/editprofile"}>Edit Profile</Link>
          <div>
            <h3>My Books</h3>
              {this.props.signedInUsersBooks.signedInUsersBooks.map((book) => (
                <div key={book.title}>
                <p>{`${book.title} by ${book.author}`}</p>
                </div> 
              ))}
            <AddBook/>
          </div>
          <div>
            <h3>Pending Book Requests</h3>
              <ul>
                {
                  this.props.signedInUsersBooks.signedInUsersBooks.map((book, index) => {
                    console.log('mapping',book);
                    if (book.requestedBy) {
                      return (
                        <li key={index}> 
                          <div>{book.requestedBy.username} from {book.requestedBy.city}, {book.requestedBy.myState} requested {book.title} from you.</div>
                          <div>            
                            <Mutation mutation={acceptBookRequest}>
                              {(acceptBookRequest) => (
                                <button 
                                  onClick={() => {
                                    console.log('request', book);
                                    acceptBookRequest({
                                      variables: { id: book.id, requestedBy: book.requestedBy.id }
                                    })
                                  }}
                                >
                                  Accept
                                </button>
                              )}
                            </Mutation> | Decline</div>
                        </li>
                      )
                    }
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
  graphql(acceptBookRequest)
)(Profile)


/* Using the big compose query export because these options didn't work.

export default compose(
  graphql(signedInUsersBooks),
  graphql(signedInUser)
  graphql(acceptBookRequest)
)(Profile)

export default compose(
  graphql(signedInUsersBooks, {name: signedInUsersBooks}),
  graphql(signedInUser, {name: signedInUser})
  graphql(acceptBookRequest)
)(Profile)

*/