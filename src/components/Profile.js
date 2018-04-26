import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { signedInUser } from '../queries';

class Profile extends Component {

  SignedInUser() {
    if (this.props.loading) return <p>Loading</p>;
    if (this.props.error) return <p>Error</p>;
    if (this.props.data.signedInUser) {
      return (
        <div>
          <ul>
            <li>{this.props.data.signedInUser.username}</li>
            <li>{this.props.data.signedInUser.givenName} {this.props.data.signedInUser.familyName}</li>
            <li>{this.props.data.signedInUser.city}, {this.props.data.signedInUser.myState}</li>
          </ul>
          <Link to={"/editprofile"}>Edit Profile</Link>
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

export default graphql(signedInUser)(Profile)
