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
