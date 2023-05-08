import gql from 'graphql-tag';

const typeDefs = gql`
  scalar DateTime

  enum Enum_RoleName {
    Admin
    User
  }

  type Role {
    id: ID!
    name: Enum_RoleName
    users: [User]
  }

  type User {
    id: ID!
    name: String
    email: String
    image: String
    role: Role
  }

  type Lot {
    id: ID!
    name: String
    cratedAt: DateTime
    updatedAt: DateTime
  }

  type Indicator {
    id: ID!
    date: DateTime
    totalCollection: Int
  }

  type Collection {
    id: ID!
    bunches: Int
    collectionDate: DateTime
    user: User
    lot: Lot
    year: Int
    month: String
    cratedAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    users: [User]
    user(email: String!): User
    collections: [Collection]
    filterCollections(month: Int, year: Int): [Collection]
    indicators: [Indicator]
    lots: [Lot]
  }

  type Mutation {
    createUser(name: String!, email: String!, image: String): User
    createCollection(
      lot: String
      bunches: Int
      collectionDate: String
    ): Collection
  }
`;

export { typeDefs };
