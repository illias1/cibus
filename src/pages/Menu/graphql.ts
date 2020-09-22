export const getProperty = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      name
      NonUniqueName
      open
      ownerId
      currency
      tables
      address {
        exact
        city
      }
      createdAt
      updatedAt
      menuComponents {
        id
        type
        translations {
          language
          label
          optionChoice {
            name
            addPrice
          }
        }
        restrictions {
          max
          exact
        }
      }
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
          addComponents
          favorite
          status
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
          # id
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
