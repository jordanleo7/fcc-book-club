import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { signedInUser } from '../queries';
import { Link } from "react-router-dom";

class SignedInUser extends Component {

  SignedInUser() {
    if (this.props.loading) return <p>Loading</p>;
    if (this.props.error) return <p>Error</p>;
    if (this.props.data.signedInUser) {
      return (
        <div>
          <span>Hi, {this.props.data.signedInUser.username}!</span>{" "}
          <Link to={"/profile"}>MyProfile</Link>{" "}
          <a href={"http://localhost:4000/auth/logout"}>Sign out</a>
        </div>
      );
    }
    return (<div><a href={"http://localhost:4000/auth/google"}>Sign in</a></div>);
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
