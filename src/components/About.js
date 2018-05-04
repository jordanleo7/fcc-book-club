import React from 'react';
import { Link } from 'react-router-dom';

const About = () => (
  <div>
    <nav className="about--container">
      <h3>About</h3>

      <p>This project is based on freeCodeCamp's <a href="https://www.freecodecamp.org/challenges/manage-a-book-trading-club" target="_blank" rel="noopener noreferrer">Manage a Book Trading Club</a> project.</p>

      <ul>
        <li>User Story: I can view all books posted by every user.</li>
        <li>User Story: I can add a new book.</li>
        <li>User Story: I can update my settings to store my full name, city, and state.</li>
        <li>User Story: I can propose a trade and wait for the other user to accept the trade.</li>
      </ul>









      <p>This project was built with JavaScript packages including React, Apollo, Node, Express, GraphQL, Mongoose, and Passport.</p>

      <a href="https://github.com/jordanleo7/fcc-book-club" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  </div>
)

export default About
