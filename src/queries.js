import gql from 'graphql-tag';

const signedInUser = gql`
  {
    signedInUser {
      id
      googleId
      username
      givenName
      familyName
      city
      myState
    }
  }
`

const allBooks = gql`
  {
    books {
      id
      title
      author
      summary
      cover
      ownedBy {
        id
        username
        city
        myState
      }
      requestedBy {
        id
        username
        city
        myState
      }
    }
  }
`

const signedInUsersBooks = gql`
  {
    signedInUsersBooks {
      id
      title
      author
      summary
      cover
      ownedBy {
        id
        username
        city
        myState
      }
      requestedBy {
        id
        username
        city
        myState
      }
    }
  }
`

const requestBook = gql`
  mutation requestBook ($id: String!) {
    requestBook(id: $id) {
      id
      title
      author
      summary
      cover
      ownedBy {
        id
        username
        city
        myState
      }
      requestedBy {
        id
        username
        city
        myState
      }
    }
  }
`

const acceptBookRequest = gql`
  mutation acceptBookRequest($id: String!, $requestedBy: String!) {
    acceptBookRequest(id: $id, requestedBy: $requestedBy) {
      id
      title
      author
      summary
      cover
      ownedBy {
        id
        username
        city
        myState
      }
      requestedBy {
        id
        username
        city
        myState
      }
    }
  }
`

export { signedInUser, allBooks, requestBook, acceptBookRequest, signedInUsersBooks }