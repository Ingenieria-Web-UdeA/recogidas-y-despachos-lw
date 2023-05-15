import Layout from '@layouts/Layout';
import Head from 'next/head';
import _ from 'lodash';
import { ActionButtons } from '@components/ActionButtons';
import { ModalRecogidas } from '@components/modals/ModalRecogidas';
import { RecogidasContextProvider } from '@context/recogidasContext';
import { ModalDespachos } from '@components/modals/ModalDespachos';
import { NextPage } from 'next';
import CardLote from '@components/cards/CardLote';
import PrivateRoute from '@components/PrivateRoute';
import { useQuery } from '@apollo/client';
import { GET_FILTERED_COLLECTIONS } from 'graphql/client/collections';
import { Lot } from '@prisma/client';
import { TypeColumn } from '@inovua/reactdatagrid-community/types';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { GET_LOTS } from 'graphql/client/lots';
import { ExtendedCollection } from 'types';
import '@inovua/reactdatagrid-community/index.css';
import { DataFilters } from '@components/DataFilters';
import { useDateFiltersContext } from '@context/dateFilterContext';

const Home: NextPage = () => (
  <PrivateRoute>
    <Layout>
      <>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <RecogidasContextProvider>
          <>
            <div className='flex h-full w-full flex-col gap-3 p-2 lg:p-10'>
              <div className='flex justify-center gap-2'>
                <h1>Despachos y Recogidas</h1>
              </div>
              <div className='flex flex-col items-center justify-center gap-3 lg:flex-row lg:justify-between'>
                <ActionButtons />
              </div>
              <TableDesktop />
              <MobileCards />
            </div>
            <ModalRecogidas />
            <ModalDespachos />
          </>
        </RecogidasContextProvider>
      </>
    </Layout>
  </PrivateRoute>
);

const TableDesktop = () => {
  const { dateFilters } = useDateFiltersContext();
  const { data, loading } = useQuery<{
    filterCollections: ExtendedCollection[];
  }>(GET_FILTERED_COLLECTIONS, {
    variables: {
      month: dateFilters.month,
      year: dateFilters.year,
    },
    fetchPolicy: 'cache-first',
  });

  const { data: lotData, loading: lotDataLoading } = useQuery<{ lots: Lot[] }>(
    GET_LOTS
  );

  if (loading || lotDataLoading) return <div>Loading...</div>;

  const lotColumns =
    lotData?.lots.map((lot) => ({
      name: lot.name,
      header: lot.name,
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    })) ?? [];

  const columns: TypeColumn[] = [
    {
      name: 'collectionDate',
      header: 'Fecha de recogida',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    ...lotColumns,
  ];

  const filterValues =
    lotData?.lots?.map((lot) => ({
      name: lot.name,
      operator: 'gte',
      type: 'number',
      value: '0',
    })) ?? [];

  const tableData = _.groupBy(data?.filterCollections, 'collectionDate');

  const transformedData = Object.keys(tableData).map((collectionDate) => {
    const lotData: { [key: string]: string | number } = {
      collectionDate,
    };

    tableData[collectionDate].forEach((collection) => {
      lotData[collection.lot.name] = collection.bunches;
    });

    return lotData;
  });

  return (
    <div className='flex h-full w-full flex-col items-center gap-2'>
      <DataFilters />
      <div className='hidden h-full w-full flex-col lg:flex'>
        <ReactDataGrid
          columns={columns}
          dataSource={transformedData}
          defaultFilterValue={filterValues}
          pagination
          pageSizes={[5, 10, 15, 20, 25, 31]}
        />
      </div>
    </div>
  );
};

const MobileCards = () => {
  const lotes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className='grid h-full grid-cols-2 gap-3 lg:hidden'>
      {lotes.map((lote) => (
        <CardLote key={`lote_${lote}`} name={lote.toString()} />
      ))}
    </div>
  );
};

export default Home;