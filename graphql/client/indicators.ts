import { gql } from '@apollo/client';

const GET_INDICATORS = gql`
  query GetCollectionsByMonth(
    $initYear: Int
    $initMonth: Int
    $finalMonth: Int
    $finalYear: Int
  ) {
    getCollectionsByMonth(
      initYear: $initYear
      initMonth: $initMonth
      finalMonth: $finalMonth
      finalYear: $finalYear
    ) {
      lot
      month
      totalBunches
      year
      monthYear
    }
  }
`;

export { GET_INDICATORS };
