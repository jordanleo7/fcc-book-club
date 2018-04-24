import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        ? <a href={"http://localhost:4000/auth/logout"}>Sign out</a>
        : <a href={"http://localhost:4000/auth/google"}>Sign in</a>
        }
      </div>
    )
  }
}

class Nav extends Component {

  render() {
    return (
      <nav>
        <Link to={"/"} className="navbar-brand">Book Trading Club</Link>
        <SignInButton/>
      </nav>
    )
  }

}

export default Nav