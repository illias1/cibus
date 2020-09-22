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
      }
      createdAt
      status
      priceTotal
      tableName
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
    address: {
      country: string | null;
      city: string | null;
      exact: string | null;
    } | null;
  };
};
