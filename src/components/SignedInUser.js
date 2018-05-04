import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { signedInUser } from '../queries';
import { Link } from "react-router-dom";
import gql from "graphql-tag";

class SignedInUser extends Component {

  SignedInUser() {
    if (this.props.signedInUsersBooks.loading || this.props.signedInUser.loading) return null;
    if (this.props.signedInUsersBooks.error || this.props.signedInUser.error) return <p className="error">Error</p>;
    if (this.props.signedInUsersBooks.signedInUsersBooks && this.props.signedInUser.signedInUser) {

      let pendingRequestsBadge = this.props.signedInUsersBooks.signedInUsersBooks.filter(
        (x, i) => (x.requestedBy)
      )

      return (
        <div className="nav--right">
          <span className="nav--requests">
            <Link to={"/pendingrequests"}>
              Requests: 
              { pendingRequestsBadge.length ? <span className="pendingRequestsBadge">{pendingRequestsBadge.length}</span> : <span>0</span> }
            </Link>
          </span>
          <span><Link to={"/profile"}>{this.props.signedInUser.signedInUser.username}'s Profile

          </Link></span>
          {/*<span><a href={"/auth/logout"}>Sign out</a></span>*/}
        </div>
      );
    }

    return (
      <div className="nav--right">
        <a href={"/auth/google"}>
          Sign in
        </a>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.SignedInUser()}
      </div>
    )
  }

}

//export default graphql(signedInUser)(SignedInUser)
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
`, {name: "signedInUser"})
)(SignedInUser)