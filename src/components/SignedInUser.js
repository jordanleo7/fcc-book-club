import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { signedInUser } from '../queries';
//import { Link } from "react-router-dom";

class SignedInUser extends Component {

  SignedInUser() {
    if (this.props.loading) return <p>Loading</p>;
    if (this.props.error) return <p>Error</p>;
    if (this.props.data.signedInUser) {
      return (<p>Hi {this.props.data.signedInUser.username}</p>);
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

export default graphql(signedInUser)(SignedInUser)
