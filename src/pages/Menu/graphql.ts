export const getProperty = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      name
      NonUniqueName
      open
      ownerId
      tables
      createdAt
      updatedAt
      menu {
        items {
          id
          propertyName
          i18n {
            description
            name
            language
            category
          }
          price
          favorite
          status
          allergyInfo
          callories
          image
          notes
          createdAt
          updatedAt
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
