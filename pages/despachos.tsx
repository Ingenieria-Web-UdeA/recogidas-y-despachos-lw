import PrivateRoute from '@components/PrivateRoute';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { TypeColumn } from '@inovua/reactdatagrid-community/types/TypeColumn';
import Layout from '@layouts/Layout';
import '@inovua/reactdatagrid-community/index.css';
import { useQuery } from '@apollo/client';
import { GET_SHIPMENTS } from 'graphql/client/shipment';
import { Shipment } from '@prisma/client';
import { DataFilters } from '@components/DataFilters';
import { useDateFiltersContext } from '@context/dateFilterContext';

const DespachosPage = () => (
  <PrivateRoute>
    <Layout>
      <div className='flex h-full w-full flex-col items-center gap-4 p-10'>
        <h1>Despachos</h1>
        <DataFilters />
        <DespachosTable />
      </div>
    </Layout>
  </PrivateRoute>
);

const DespachosTable = () => {
  const { dateFilters } = useDateFiltersContext();
  const { data, loading } = useQuery<{ filterShipments: Shipment[] }>(
    GET_SHIPMENTS,
    {
      variables: {
        month: dateFilters.month,
        year: dateFilters.year,
      },
    }
  );

  if (loading) return <div>Loading...</div>;

  const columns: TypeColumn[] = [
    {
      name: 'despacho',
      header: 'Despacho',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    {
      name: 'shipmentDate',
      header: 'Fecha del despacho',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    {
      name: 'shippedBunches',
      header: 'Racimos despachados',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    {
      name: 'bunchWeight',
      header: 'Peso por racimo',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    {
      name: 'deliveredWeight',
      header: 'Kilos entregados en planta',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
  ];
  return (
    <div className='flex h-full w-full'>
      <ReactDataGrid
        columns={columns}
        dataSource={
          data?.filterShipments.map((shipment, index) => ({
            ...shipment,
            despacho: index + 1,
          })) ?? []
        }
        pagination
        pageSizes={[5, 10, 15]}
      />
    </div>
  );
};

export default DespachosPage;
