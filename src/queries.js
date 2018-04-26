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
      }
    }
  }
`

export { signedInUser }