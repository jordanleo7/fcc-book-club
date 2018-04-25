import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import axios from 'axios';
import { Link } from "react-router-dom";

const SignedInUser = () => {
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
      console.log(loading, error, data)
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error</p>;
      console.log(data);
      //if (data) {
        return (
          <div>
            <p>Hi</p>
          </div> 
        );
      //}
      //return (<p>yeah no</p>)
    }}
  </Query>
}

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

        <SignedInUser/>
        
      </div>
    )
  }

}

export default Profile

/*
const AllBooks = () => (
  <Query query={gql`
    {
      books {
        title
      }
    }
    `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading</p>;
        if (error) return <p>Error</p>;
        console.log(data);
        return data.books.map((book) => (
          <div key={book.title}>
          <p>{`book title: ${book.title}`}</p>
          </div> 
        ));
      }}
  </Query>
);





class SignInButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null
    }
  }
  componentDidMount() {
    axios.get('/auth/isSignedIn')
    .then((response) => {
      console.log(response)
      this.setState({ isSignedIn: response.data})
    })
    .catch((error) => {
      console.log(error)
    });
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

class Nav extends Component {

  render() {
    return (
      <nav>
        <Link to={"/"}>Book Trading Club</Link>
        <SignInButton/>
      </nav>
    )
  }

}

export default Nav
*/