import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInUser from './SignedInUser';

class Nav extends Component {

  render() {
    return (
      <nav>
        <Link to={"/"}>Book Trading Club</Link>
        <SignedInUser/>
      </nav>
    )
  }

}

export default Nav