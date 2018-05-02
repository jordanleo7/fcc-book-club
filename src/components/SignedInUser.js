import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { signedInUser } from '../queries';
import { Link } from "react-router-dom";

const navRightStyle = {
  float: 'right', 
  margin: '21px 0 0 0',
}

const linkStyle = {
  color: '#8ADD95',
  textDecoration: 'none',
  margin: '0 0 0 8px'
}

class SignedInUser extends Component {

  SignedInUser() {
    if (this.props.loading) return <p>Loading</p>;
    if (this.props.error) return <p>Error</p>;
    if (this.props.data.signedInUser) {
      return (
        <div>
          <span>Hi, {this.props.data.signedInUser.username}!</span>{" "}
          <Link to={"/profile"} style={linkStyle}>MyProfile</Link>{" "}
          <a href={"/auth/logout"} style={linkStyle}>Sign out</a>
        </div>
      );
    }
    return (<div><a href={"/auth/google"} style={linkStyle}>Sign in</a></div>);
  }

  render() {
    return (
      <div style={navRightStyle}>
        {this.SignedInUser()}
      </div>
    )
  }

}

export default graphql(signedInUser)(SignedInUser)
