import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { graphql, Mutation } from 'react-apollo';
import { signedInUser } from '../queries';
import gql from "graphql-tag";

const EDIT_USER = gql`
  mutation editUser($username: String!, $givenName: String!, $familyName: String!, $city: String, $myState: String) {
    editUser(username: $username, givenName: $givenName, familyName: $familyName, city: $city, myState: $myState) {
      id
      username
      givenName
      familyName
      city
      myState
    }
  }
`;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: "",
      givenName: "",
      familyName: "",
      city: "",
      myState: "",
      redirectToNewPage: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    if (this.state.redirectToNewPage) {
      return <Redirect to="/profile" />;
    }

    return (
      <Mutation
      mutation={EDIT_USER}
      /*update={(cache, { data: { editUser } }) => {
        const { signedInUser } = cache.readQuery({ query: signedInUser });
        cache.writeQuery({
          query: signedInUser,
          data: { signedInUser: editUser }
        });
      }}*/
      refetchQueries={[{ query: signedInUser }]}
      >
      {editUser => (
        <div>
          <form onSubmit={e => {
            e.preventDefault();
            editUser({ variables: { 
              username: this.state.username,
              givenName: this.state.givenName,
              familyName: this.state.familyName,
              city: this.state.city,
              myState: this.state.myState
            }})
          }}>

          <div>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
              maxLength="50"
              required
            />
          </label>

          <label>
            First name:
            <input
              name="givenName"
              type="text"
              value={this.state.givenName}
              onChange={this.handleInputChange}
              maxLength="50"
              required
            />
          </label>

          <label>
            Last name:
            <input
              name="familyName"
              type="text"
              value={this.state.familyName}
              onChange={this.handleInputChange}
              maxLength="50"
              required
            />
          </label>

          <label>
            City:
            <input
              name="city"
              type="text"
              value={this.state.city}
              onChange={this.handleInputChange}
              maxLength="50"
            />
          </label>

          <label>
            State:
            <input
              name="myState"
              type="text"
              value={this.state.myState}
              onChange={this.handleInputChange}
              maxLength="200"
            />
          </label>
          </div>

          <button type="submit">Edit Profile</button>

          </form>
        </div>
      )}
      </Mutation>
    );
  };
}

export default EditProfile