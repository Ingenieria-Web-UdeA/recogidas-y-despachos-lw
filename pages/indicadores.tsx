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

const Indicadores = () => (
  <PrivateRoute>
    <Layout>
      <div className='p-10'>
        <DataFilters hideMonth />
        <MonthChart />
      </div>
    </Layout>
  </PrivateRoute>
);

const MonthChart = () => {
  const { dateFilters } = useDateFiltersContext();
  const { data, loading } = useQuery<{ getCollectionsByMonth: Indicator[] }>(
    GET_INDICATORS,
    {
      variables: {
        initMonth: dateFilters.initMonth,
        initYear: dateFilters.initYear,
        finalMonth: dateFilters.finalMonth,
        finalYear: dateFilters.finalYear,
      },
    }
  );

  const { data: lotData, loading: lotsLoading } = useQuery<{ lots: Lot[] }>(
    GET_LOTS
  );

  if (loading || lotsLoading) return <div>Loading...</div>;

  const lotNames = lotData?.lots.map((lot) => ({
    value: lot.name,
    name: lot.name,
  }));

  const groupedData = _.groupBy(data?.getCollectionsByMonth, 'monthYear');

  const modifiedData = Object.keys(groupedData).map((month) => {
    const [y, m] = month.split('-');
    const monthName = months.find((el) => el.value === parseInt(m) - 1)?.name;

    const monthData: { [key: string]: string | number } = {
      monthYear: `${monthName} ${y}`,
    };

    groupedData[month].forEach((lot) => {
      monthData[lot.lot] = lot.totalBunches;
    });

    return monthData;
  });

  return (
    <Chart palette='Violet' dataSource={modifiedData}>
      <CommonSeriesSettings argumentField='monthYear' type='line' />
      {lotNames?.map((item) => (
        <Series key={item.value} valueField={item.value} name={item.name} />
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
  );
};

export default Indicadores;
