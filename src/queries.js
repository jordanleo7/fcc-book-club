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
      state
    }
  }
`

export { signedInUser }