import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInUser from './SignedInUser';

const clearfix = {
  clear: 'both'
}

const navContainerStyle = {
  background: '#384253',
  color: '#4396C4',
  padding: '0 8px'
}

const logoStyle = {
  float: 'left',
  color: '#4396C4',
  textDecoration: 'none',
}

class Nav extends Component {

  render() {
    return (
      <div style={navContainerStyle}>
        <nav>
          <Link to={"/"} style={logoStyle}><h3>Book Trading Club</h3></Link>
          <SignedInUser/>
        </nav>
        <div style={clearfix}></div>
      </div>
    )
  }

}

export default Nav