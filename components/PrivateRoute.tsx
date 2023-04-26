import { useUserData } from '@hooks/useUserData';
import { Enum_RoleName } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface PrivateRouteProps {
  role?: Enum_RoleName;
  children: JSX.Element | JSX.Element[];
}

const PrivateRoute = ({ role, children }: PrivateRouteProps) => {
  const { status, session, role: userRole, loadingUserData } = useUserData();

  if (status === 'loading' || loadingUserData) return <div>Loading...</div>;

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

  if (role && role !== userRole)
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
        <h1 className='text-5xl text-red-500'>
          No tienes permiso para acceder a este recurso.
        </h1>
        <Link href='/app' className='text-2xl text-blue-500'>
          Ir a la app
        </Link>
      </div>
    );

  return <>{children}</>;
};

export default PrivateRoute;
