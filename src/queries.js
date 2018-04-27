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
      inventory {
        id
        title
        author
        summary
        cover
        ownedBy {
          id
          username
        }
        requestedBy {
          id
          username
        }
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
      }
      requestedBy {
        id
        username
      }
    }
  }
`

export { signedInUser, requestBook }