import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginUserInput: {email: $email, password: $password}) {
      access_token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(input: {email: $email, password: $password}) {
      accessToken
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;