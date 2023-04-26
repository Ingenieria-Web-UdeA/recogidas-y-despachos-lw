import { useUserData } from '@hooks/useUserData';
import { Enum_RoleName } from '@prisma/client';
import React from 'react';

interface PrivateComponentProps {
  role: Enum_RoleName;
  children: JSX.Element | JSX.Element[];
}

const PrivateComponent = ({ role, children }: PrivateComponentProps) => {
  const { role: userRole, loadingUserData, status } = useUserData();

  if (status === 'loading' || loadingUserData) return <></>;

  if (userRole !== role) return <></>;

  return <>{children}</>;
};

export default PrivateComponent;
