import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { graphql, compose, Mutation } from 'react-apollo';
import { signedInUser, signedInUsersBooks, addBook } from '../queries';
import gql from "graphql-tag";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $summary: String!, $cover: String) {
    addBook(title: $title, author: $author, summary: $summary, cover: $cover) {
      id
      title
      author
      summary
      cover
      ownedBy
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
      redirectToNewPage: false
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

    if (this.state.redirectToNewPage) {
      return <Redirect to="/profile" />;
    }

    return (
      <Mutation
      mutation={addBook}
      refetchQueries={[{ query: signedInUsersBooks }]}
      >
      {addBook => (
        <div className="addbook--container">
          <h3>New Book</h3>
          <form onSubmit={e => {
            e.preventDefault();
            addBook({ variables: { 
              title: this.state.title,
              author: this.state.author,
              summary: this.state.summary
            }})
            this.setState({ redirectToNewPage: true })
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

          <button type="submit" className="button--yes">Add</button>

          </form>
        </div>
      )}
      </Mutation>
    );
  };
}

export default compose(
  graphql(signedInUser),
  graphql(addBook)
)(AddBook)

/*
            this.setState({ 
              title: "",
              author: "",
              summary: "",
              cover: ""
            })*/