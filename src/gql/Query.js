import { gql } from "@apollo/client";

export const GET_CATEGORY_NAME = gql`
  query getCategoryName {
    categories {
      name
      products {
        name
        id
      }
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

export const GET_CURRENCY_DATA = gql`
  query getCurrencyData {
    currencies {
      label
      symbol
    }
  }
`;

export function GET_PRODUCT_DETAILS(productId) {
  return gql`
  query GetProductsForCategory {
    product(id:"${productId}"){
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
  }`;
}
