import { gql } from '@apollo/client';

const GET_USERS = gql`
  query Users {
    users {
      id
      name
      email
      lastLogin
    }
  }
`;

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      id
      email
      role {
        name
      }
    }
  }
`;

export { GET_USERS, GET_USER };
