import { gql } from "@apollo/client";

export const GET_CATEGORY_NAME = gql`
  query getCategoryName {
    categories {
      name
    }
  }
`;

export function GET_PRODUCTS_FOR_CATEGORY(category) {
  return gql`
  query GetProductsForCategory {
    category(input: { title: "${category}" }) {
      products{
        id
        name
        inStock
        gallery
        description
        category
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices{
          currency{
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }`;
}
