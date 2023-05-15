import { useQuery } from '@apollo/client';
import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layouts/Layout';
import { GET_INDICATORS } from 'graphql/client/indicators';
import React from 'react';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Tooltip,
  Grid,
} from 'devextreme-react/chart';
import _ from 'lodash';
import { Lot } from '@prisma/client';
import { GET_LOTS } from 'graphql/client/lots';
import { DataFilters, months } from '@components/DataFilters';
import { useDateFiltersContext } from '@context/dateFilterContext';

interface Indicator {
  year: number;
  month: number;
  lot: string;
  totalBunches: number;
}

const Indicadores = () => {
  const { dateFilters } = useDateFiltersContext();
  const { data, loading } = useQuery<{ getCollectionsByMonth: Indicator[] }>(
    GET_INDICATORS,
    {
      variables: {
        year: dateFilters.year,
      },
    }
  );

  const { data: lotData, loading: lotsLoading } = useQuery<{ lots: Lot[] }>(
    GET_LOTS
  );

  if (loading || lotsLoading) return <div>Loading...</div>;

  const groupedData = _.groupBy(data?.getCollectionsByMonth, 'month');
  const modifiedData = Object.keys(groupedData).map((month) => {
    const monthData: { [key: string]: string | number } = {
      month: months.find((m) => m.value === parseInt(month) - 1)?.name ?? '',
    };

    groupedData[month].forEach((lot) => {
      monthData[lot.lot] = lot.totalBunches;
    });

    return monthData;
  });

  const lotNames = lotData?.lots.map((lot) => ({
    value: lot.name,
    name: lot.name,
  }));

  return (
    <PrivateRoute>
      <Layout>
        <div className='p-10'>
          <DataFilters hideMonth />
          <Chart palette='Violet' dataSource={modifiedData}>
            <CommonSeriesSettings argumentField='month' type='line' />
            {lotNames?.map((item) => (
              <Series
                key={item.value}
                valueField={item.value}
                name={item.name}
              />
            ))}
            <Margin bottom={20} />
            <ArgumentAxis
              valueMarginsEnabled={false}
              discreteAxisDivisionMode='crossLabels'
            >
              <Grid visible={true} />
            </ArgumentAxis>
            <Legend
              verticalAlignment='bottom'
              horizontalAlignment='center'
              itemTextPosition='bottom'
            />
            <Export enabled={true} />
            <Title text='Cantidad de racimos por mes' />
            <Tooltip enabled={true} />
          </Chart>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Indicadores;
