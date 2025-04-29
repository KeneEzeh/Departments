import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query GetDepartments($page: Int!, $limit: Int!) {
    getDepartments(page: $page, limit: $limit) {
      data {
        id
        name
        subDepartments {
          id
          name
        }
      }
      total
      page
      limit
    }
  }
`;