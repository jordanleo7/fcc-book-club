import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      isSignedIn: null
    };
  }

  render() {
    return (
      <div>
        { this.state.isSignedIn 
        ? <div><Link to={"/profile"}>MyProfile</Link>{" "}<a href={"http://localhost:4000/auth/logout"}>Sign out</a></div>
        : <div><a href={"http://localhost:4000/auth/google"}>Sign in</a></div>
        }

        
        
      </div>
    )
  }

}

export default Profile
