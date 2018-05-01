import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AllBooks from './AllBooks';
import AllUsers from './AllUsers';
import SignedInUser from "./SignedInUser";

const bookStyling = {
  padding: '0 8px',
  margin: '0 auto',
  textAlign: 'center'
}

const Home = () => (
  <div style={bookStyling}>
    <h3>All Books</h3>
    <AllBooks/>
  </div>
)

export default Home;