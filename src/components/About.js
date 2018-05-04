import React from 'react';
import { Link } from 'react-router-dom';

const About = () => (
  <div className="about--container">

    <h3>About</h3>
    <ul>
      <li>This project is based on freeCodeCamp's <a href="https://www.freecodecamp.org/challenges/manage-a-book-trading-club" target="_blank" rel="noopener noreferrer">Manage a Book Trading Club</a> project.</li>
      <li>Different React component and Apollo query methods were used throughout the project for practice.</li>
      <li>I'd like to add GraphQL Subscriptions to push book updates and requests.</li>
    </ul>

    <h3>User Stories</h3>
    <ul>
      <li>User Story: I can view all books posted by every user.</li>
      <li>User Story: I can add a new book.</li>
      <li>User Story: I can update my settings to store my full name, city, and state.</li>
      <li>User Story: I can propose a trade and wait for the other user to accept the trade.</li>
    </ul>

    <h3>Dependencies</h3>
    <ul>
      <li>Front end: React, Apollo</li>
      <li>Back end: Node, Express, GraphQL, Mongoose, Passport</li>
    </ul>

    <h3>My <a href="https://jordanleo7.github.io/portfolio/" target="_blank" rel="noopener noreferrer">Portfolio</a></h3>

  </div>
)

export default About
