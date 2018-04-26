import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AllBooks from './AllBooks';
import AllUsers from './AllUsers';
import SignedInUser from "./SignedInUser";

const Home = () => (
  <div>
    <h3>All Books</h3>
    <AllBooks/>
  </div>
)

export default Home;