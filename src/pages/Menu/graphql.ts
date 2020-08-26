export const getProperty = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      name
      ownerId
      tables
      createdAt
      updatedAt
      owner
      menu {
        items {
          id
          propertyName
          price
          status
          allergyInfo
          callories
          image
          createdAt
          updatedAt
          i18n {
            description
            name
            language
            category
          }
          owner
        }
        nextToken
      }
      orders {
        items {
          id
          propertyName
          createdAt
          status
          tableName
          updatedAt
        }
        nextToken
      }
    }
  }
`;
