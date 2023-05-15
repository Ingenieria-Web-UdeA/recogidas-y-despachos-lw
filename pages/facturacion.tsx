import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layouts/Layout';
import React from 'react';

const FacturacionPage = () => {
  return (
    <PrivateRoute role='Admin'>
      <Layout>
        <div>FacturacionPage</div>
      </Layout>
    </PrivateRoute>
  );
};

export default FacturacionPage;
