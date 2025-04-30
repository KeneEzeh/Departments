import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginUserInput: {email: $email, password: $password}) {
      access_token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $username: String!) {
    signup(input: {email: $email, password: $password, username: $username}) {
        id
        email,
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

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: String!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;