import { gql } from "@apollo/client";

export const GET_CURRENT_LOG_PROFILE = gql`
  query FindCurrentLogUser {
    findCurrentLogUser {
      _id
      name
      username
      email
      createdAt
    }
  }
`;
