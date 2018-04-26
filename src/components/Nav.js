import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInUser from './SignedInUser';

class Nav extends Component {

  render() {
    return (
      <nav>
        <Link to={"/"}><h3>Book Trading Club</h3></Link>
        <SignedInUser/>
      </nav>
    )
  }

}

export default Nav