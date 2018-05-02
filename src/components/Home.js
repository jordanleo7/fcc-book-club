import React from 'react';
import AllBooks from './AllBooks';

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