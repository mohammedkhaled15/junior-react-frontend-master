import { gql } from "@apollo/client";

export const GET_CATEGORY_NAME = gql`
  query getCategoryName {
    categories {
      name
    }
  }
`;
