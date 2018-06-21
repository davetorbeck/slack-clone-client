import gql from 'graphql-tag'

export const meQuery = gql`
  {
    me {
      id
      username
      directMessageMembers {
        id
        username
      }
      teams {
        id
        name
        channels {
          id
          name
        }
      }
    }
  }
`
