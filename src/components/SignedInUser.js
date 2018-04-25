import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
//import { Link } from "react-router-dom";

const SignedInUser = () => (
  <Query query={gql`
    {
      signedInUser {
        id
        googleId
        username
        givenName
        familyName
        city
        state
      }
    }
  `}
  >
    {({ loading, error, data }) => {
            console.log(loading, error, data);
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error</p>;
      if (data.signedInUser) {
        console.log('SignedInUser data: ',loading, error, data);
        return (<div><p>Hi {data.signedInUser.username}</p></div> );
        }
      return (<p>Please log in</p>);
    }}
  </Query>
)

export default SignedInUser
