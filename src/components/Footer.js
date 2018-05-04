import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div>
    <nav className="footer--container">
      <Link to={"/about"}>About</Link>
      <a href="https://github.com/jordanleo7/fcc-book-club" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  </div>
)

export default Footer
