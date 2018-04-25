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
      console.log('/auth/isSignedIn response:', response)
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