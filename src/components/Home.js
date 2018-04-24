import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Book Trading Club</h2>
    <Link to={"/allbooks"} className="nav-link">View all books</Link>
  </div>
)

export default Home;