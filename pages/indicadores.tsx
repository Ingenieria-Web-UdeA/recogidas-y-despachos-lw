import { useQuery } from '@apollo/client';
import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layouts/Layout';
import { GET_INDICATORS } from 'graphql/client/indicators';
import React from 'react';

interface Indicator {
  id: string;
  date: string;
  totalCollection: number;
}

const Indicadores = () => {
  const { data, loading } = useQuery<{ indicators: Indicator[] }>(
    GET_INDICATORS
  );

  if (loading) return <div>Loading...</div>;
  return (
    <PrivateRoute>
      <Layout>
        <div className='flex w-full justify-center p-10'>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Total recogidas</th>
              </tr>
            </thead>
            <tbody>
              {data?.indicators.map((indicator) => (
                <tr key={indicator.id}>
                  <td>{indicator.date}</td>
                  <td>{indicator.totalCollection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Indicadores;
