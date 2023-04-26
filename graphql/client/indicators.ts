import { gql } from '@apollo/client';

const GET_INDICATORS = gql`
  query Indicators {
    indicators {
      id
      date
      totalCollection
    }
  }
`;

export { GET_INDICATORS };
