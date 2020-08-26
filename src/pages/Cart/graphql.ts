export const createOrder = /* GraphQL */ `
  mutation CreateOrder($input: CreateOrderInput!, $condition: ModelOrderConditionInput) {
    createOrder(input: $input, condition: $condition) {
      id
      propertyName
      orderItem {
        name
        price
        quantity
        allergyInfo
        customerComment
      }
      createdAt
      status
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
    }
  }
`;

export type GetPropertyQueryForCart = {
  getProperty: {
    name: string;
    NonUniqueName: string;
    open: boolean;
    tables: Array<string | null>;
  };
};
