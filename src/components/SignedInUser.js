import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { signedInUser } from '../queries';
import { Link } from "react-router-dom";

class SignedInUser extends Component {

  SignedInUser() {
    if (this.props.loading) return <div>Loading</div>;
    if (this.props.error) return <p>Error</p>;
    if (this.props.data.signedInUser) {
      return (
        <div className="nav--right">
          <span>Hi, {this.props.data.signedInUser.username}!</span>
          <span><Link to={"/profile"}>Profile</Link></span>
          <span><a href={"/auth/logout"}>Sign out</a></span>
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

export default graphql(signedInUser)(SignedInUser)
