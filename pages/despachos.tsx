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
import _ from 'lodash';

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
    <div className='flex h-full w-full flex-col gap-3'>
      <IndicatorCards shipments={data?.filterShipments ?? []} />
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

interface IndicatorCardsProps {
  shipments: Shipment[];
}

const IndicatorCards = ({ shipments }: IndicatorCardsProps) => {
  const totalBunches = _.sumBy(shipments, 'shippedBunches'); // opcion 1 para calcular una suma: usando lodash

  const deliveredWeight = shipments.reduce(
    (accumulator, currentValue) => accumulator + currentValue.deliveredWeight,
    0
  ); // opcion 2 para calcular una suma: usando reduce

  const averageBunchWeight = deliveredWeight / totalBunches;

  return (
    <div className='flex w-full justify-center gap-3'>
      <IndicatorCard title='Total racimos despachados' metric={totalBunches} />
      <IndicatorCard
        title='Peso por racimo'
        metric={averageBunchWeight.toFixed(2)}
      />
      <IndicatorCard title='Total kilos entregados' metric={deliveredWeight} />
    </div>
  );
};

interface IndicatorCardProps {
  title: string;
  metric: number | string;
}

const IndicatorCard = ({ title, metric }: IndicatorCardProps) => (
  <div className='flex flex-col items-center rounded-xl bg-gray-700 px-4 py-2 shadow-lg'>
    <h2 className='text-lg font-bold text-white'>{title}</h2>
    <span className='font-semibold text-white'>{metric}</span>
  </div>
);

export default DespachosPage;
