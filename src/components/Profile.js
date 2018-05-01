import React, { Component } from 'react';
import { graphql, compose, Mutation, Subscription } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { signedInUser, signedInUsersBooks, acceptBookRequest, denyBookRequest, subscribeToBookUpdates } from '../queries';
import AddBook from './AddBook';
import { connect } from 'mongoose';

const profileContainer = {
  padding: '8px',
  textAlign: 'center'
}

const listStyle = {
  listStyleType: 'none',
  margin: '0',
  padding: '0'
}

const editProfileLinkContainer = {
  padding: '16px 0',
  borderBottom: '1px solid lightgray',
  borderRadius: '0'
}

const linkStyle = {
  color: '#4396C4',
  textDecoration: 'none',
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

class Profile extends Component {

  SignedInUser() {
    console.log(this.props,'signedInUsersBooks:',this.props.signedInUsersBooks.signedInUsersBooks, 'signedInUser:',this.props.signedInUser.signedInUser);
    if (this.props.signedInUsersBooks.loading || this.props.signedInUser.loading) return <p>Loading</p>;
    if (this.props.signedInUsersBooks.error || this.props.signedInUser.error) return <p>Error</p>;
    if (this.props.signedInUsersBooks && this.props.signedInUser) {

      return (
        <div style={profileContainer}>
          <div>
            <h3>My Profile</h3>
            <ul style={listStyle}>
              <li>{this.props.signedInUser.signedInUser.username}</li>
              <li>{this.props.signedInUser.signedInUser.givenName} {this.props.signedInUser.signedInUser.familyName}</li>
              <li>{this.props.signedInUser.signedInUser.city}, {this.props.signedInUser.signedInUser.myState}</li>
            </ul>
          </div>
          <div style={editProfileLinkContainer}>
            <Link to={"/editprofile"} style={linkStyle}>Edit Profile</Link>
          </div>
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
                    if (book.requestedBy) {
                      return (
                        <li key={index}> 
                          <div>{book.requestedBy.username} from {book.requestedBy.city}, {book.requestedBy.myState} requested {book.title} from you.</div>
                          <div>            
                            <Mutation mutation={acceptBookRequest}>
                              {(acceptBookRequest) => (
                                <button 
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
                            
                            <Mutation mutation={denyBookRequest}>
                              {(denyBookRequest) => (
                                <button 
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
  graphql(acceptBookRequest),
  graphql(denyBookRequest)
)(Profile)

/* this one works
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
*/


/* 

, {
    options: {
      refetchQueries: [
        {query: gql`
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
        `, variables: {name: "signedInUser"}
        }
      ],
    },
  }


, {
    options: (props) => ({
      refetchQueries: [
        {
          query: gql`
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
          }
        }
        }
        `, variables {name: "signedInUsersBooks"}
        }
      ]
    })
  }


export default graphql(gql`mutation { ... }`, {
  options: (props) => ({
    refetchQueries: [
      {
        query: COMMENT_LIST_QUERY,
      },
      {
        query: gql`
          query ($id: ID!) {
            post(id: $id) {
              commentCount
            }
          }
        `,
        variables: {
          id: props.postID,
        },
      },
    ],
  }),
})(MyComponent);


Using the big compose query export because these options didn't work. Use quotation marks in 2nd test?

export default compose(
  graphql(signedInUsersBooks),
  graphql(signedInUser),
  graphql(acceptBookRequest),
  graphql(denyBookRequest)
)(Profile)

export default compose(
  graphql(signedInUsersBooks, {name: signedInUsersBooks}),
  graphql(signedInUser, {name: signedInUser}),
  graphql(acceptBookRequest),
  graphql(denyBookRequest)
)(Profile)

*/

