import { Currency } from "../../API";

export const createOrder = /* GraphQL */ `
  mutation CreateOrder($input: CreateOrderInput!, $condition: ModelOrderConditionInput) {
    createOrder(input: $input, condition: $condition) {
      id
      propertyName
      orderItem {
        id
        name
        price
        quantity
        customerComment
        optionsTotalPrice
        options {
          id
          label
          optionChoice {
            name
            addPrice
          }
        }
      }
      createdAt
      status
      priceTotal
      tableName
      customerName
      updatedAt
    }
  }
`;

export const getPropertyForCart = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      name
      NonUniqueName
      open
      tables
      image {
        main
      }
      info {
        Facebook
        Instagram
      }
      currency
      address {
        city
        exact
      }
    }
  }
`;

export type GetPropertyQueryForCart = {
  getProperty: {
    name: string;
    NonUniqueName: string;
    open: boolean;
    tables: Array<string | null>;
    currency: Currency;
    image: {
      main: string | null;
    } | null;
    address: {
      country: string | null;
      city: string | null;
      exact: string | null;
    } | null;
    info: {
      __typename: "Info";
      Facebook: string | null;
      Instagram: string | null;
    } | null;
  };
};
