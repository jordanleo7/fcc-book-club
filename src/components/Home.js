import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AllBooks from './AllBooks';
import AllUsers from './AllUsers';
import SignedInUser from "./SignedInUser";

const Home = () => (
  <div>
    <h2>Book Trading Club</h2>
    <AllBooks/>
  </div>
)

export default Home;