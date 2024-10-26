import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      name
      username
      _id
    }
  }
`;


export const LOGIN  = gql`
mutation Login($input: SignInInput!){
    logIn(input: $input) {
        _id
        username
        name
        profileImage
    }
}
`