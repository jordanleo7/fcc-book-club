import React, { Component } from "react";
import { graphql, Mutation } from 'react-apollo';
import { signedInUser } from '../queries';
import gql from "graphql-tag";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $summary: String!, $cover: String) {
    addBook(title: $title, author: $author, summary: $summary, cover: $cover) {
      id
      title
      author
      summary
      cover
    }
  }
`;

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      summary: "",
      cover: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    return (
      <Mutation
      mutation={ADD_BOOK}
      refetchQueries={[{ query: signedInUser }]}
      >
      {addBook => (
        <div>
          <form onSubmit={e => {
            e.preventDefault();
            addBook({ variables: { 
              title: this.state.title,
              author: this.state.author,
              summary: this.state.summary,
              cover: this.state.cover
            }})
            this.setState({ 
              title: "",
              author: "",
              summary: "",
              cover: ""
            })
          }}>

          <div>
          <label>
            Title:
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleInputChange}
              maxLength="100"
              required
            />
          </label>

          <label>
            Author:
            <input
              name="author"
              type="text"
              value={this.state.author}
              onChange={this.handleInputChange}
              maxLength="100"
              required
            />
          </label>

          <label>
            Summary:
            <input
              name="summary"
              type="text"
              value={this.state.summary}
              onChange={this.handleInputChange}
              maxLength="500"
              required
            />
          </label>

          </div>

          <button type="submit">Add book to my inventory</button>

          </form>
        </div>
      )}
      </Mutation>
    );
  };
}

export default graphql(signedInUser)(AddBook)