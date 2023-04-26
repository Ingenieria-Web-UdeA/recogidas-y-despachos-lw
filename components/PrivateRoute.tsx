import { useUserData } from '@hooks/useUserData';
import Link from 'next/link';
import React from 'react';

interface PrivateRouteProps {
  children: JSX.Element | JSX.Element[];
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status, session } = useUserData();

  if (status === 'loading') return <div>Loading...</div>;

  if (!session)
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
        <h1 className='text-5xl text-red-500'>
          Esta ruta necesita autenticación. Por favor inicia sesión
        </h1>
        <Link href='/' className='text-2xl text-blue-500'>
          Ir al home
        </Link>
      </div>
    );

  return <>{children}</>;
};

export default PrivateRoute;
