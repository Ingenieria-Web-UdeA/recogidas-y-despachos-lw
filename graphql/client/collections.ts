import { gql } from '@apollo/client';

const GET_FILTERED_COLLECTIONS = gql`
  query FilterCollections($month: Int, $year: Int) {
    filterCollections(month: $month, year: $year) {
      lot {
        name
      }
      collectionDate
      bunches
    }
  }
`;

const CREATE_COLLECTION = gql`
  mutation CreateCollection(
    $lot: String
    $bunches: Int
    $collectionDate: String
  ) {
    createCollection(
      lot: $lot
      bunches: $bunches
      collectionDate: $collectionDate
    ) {
      id
    }
  }
`;

export { GET_FILTERED_COLLECTIONS, CREATE_COLLECTION };
