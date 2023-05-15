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

  type Shipment {
    id: ID
    shippedBunches: Int
    shipmentDate: DateTime
    bunchWeight: Float
    deliveredWeight: Float
    createdBy: User
    createdAt: DateTime
    updatedAt: DateTime
  }

  type CollectionByMonth {
    year: Int
    month: Int
    lot: String
    totalBunches: Int
  }

  type Query {
    users: [User]
    user(email: String!): User
    collections: [Collection]
    filterCollections(month: Int, year: Int): [Collection]
    filterShipments(month: Int, year: Int): [Shipment]
    getCollectionsByMonth(year: Int): [CollectionByMonth]
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
    createShipment(
      shippedBunches: Int
      shipmentDate: String
      deliveredWeight: Float
    ): Shipment
  }
`;

export { typeDefs };
