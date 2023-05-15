import { gql } from '@apollo/client';

const GET_INDICATORS = gql`
  query GetCollectionsByMonth($year: Int) {
    getCollectionsByMonth(year: $year) {
      year
      month
      lot
      totalBunches
    }
  }
`;

export { GET_INDICATORS };
