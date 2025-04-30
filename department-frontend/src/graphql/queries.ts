import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
     getDepartments {
        id
        name
        subDepartments {
            id
            name
        }
    }
  }
`;