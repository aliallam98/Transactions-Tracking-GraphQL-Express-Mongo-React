import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query GetAuthUser {
    user {
      _id
      username
      profileImage
    }
  }
`;
