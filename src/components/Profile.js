import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { signedInUser } from '../queries';
import AddBook from './AddBook';

class Profile extends Component {

  SignedInUser() {
    if (this.props.loading) return <p>Loading</p>;
    if (this.props.error) return <p>Error</p>;
    if (this.props.data.signedInUser) {
      console.log(this.props.data.signedInUser);
      return (
        <div>
          <div>
            <h3>My Profile</h3>
            <ul>
              <li>{this.props.data.signedInUser.username}</li>
              <li>{this.props.data.signedInUser.givenName} {this.props.data.signedInUser.familyName}</li>
              <li>{this.props.data.signedInUser.city}, {this.props.data.signedInUser.myState}</li>
            </ul>
          </div>
          <Link to={"/editprofile"}>Edit Profile</Link>
          <div>
            <h3>My Books</h3>
              {this.props.data.signedInUser.inventory.map((book) => (
                <div key={book.title}>
                <p>{`${book.title} by ${book.author}`}</p>
                </div> 
              ))}
            <AddBook/>
          </div>
          <div>
            <h3>My Pending Trades</h3>
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

export default graphql(signedInUser)(Profile)
