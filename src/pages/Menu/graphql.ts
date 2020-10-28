export const getProperty = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      name
      NonUniqueName
      open
      ownerId
      currency
      tables
      info {
        Facebook
        Instagram
      }
      address {
        exact
        city
      }
      createdAt
      updatedAt

      image {
        main
      }
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
          image
        }
        nextToken
      }
    }
  }
`;
