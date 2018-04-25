import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

const AllUsers = () => (
  <Query query={gql`
    {
      users {
        username
      }
    }
    `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading</p>;
        if (error) return <p>Error</p>;
        return data.users.map((user) => (
          <div key={user.username}>
          <p>{`username: ${user.username}`}</p>
          </div> 
        ));
      }}
  </Query>
);

export default AllUsers
