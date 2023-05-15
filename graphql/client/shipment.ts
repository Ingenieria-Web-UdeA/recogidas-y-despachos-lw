import { gql } from '@apollo/client';

const GET_SHIPMENTS = gql`
  query FilterShipments($month: Int, $year: Int) {
    filterShipments(month: $month, year: $year) {
      id
      bunchWeight
      deliveredWeight
      shipmentDate
      shippedBunches
    }
  }
`;

const CREATE_SHIPMENT = gql`
  mutation CreateShipment(
    $shippedBunches: Int
    $shipmentDate: String
    $deliveredWeight: Float
  ) {
    createShipment(
      shippedBunches: $shippedBunches
      shipmentDate: $shipmentDate
      deliveredWeight: $deliveredWeight
    ) {
      id
      shipmentDate
      shippedBunches
      bunchWeight
      deliveredWeight
    }
  }
`;

export { CREATE_SHIPMENT, GET_SHIPMENTS };
