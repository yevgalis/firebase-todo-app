import React, { ElementType, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/authContext';

interface IProps {
  Component: ElementType;
}

const PrivateRoute: FC<IProps> = ({ Component }: IProps) => {
  const { isAuthorized } = useAuth();

  if (isAuthorized === null) {
    return <div>Authorizing...</div>;
  }

  return (
    <React.Fragment>
      {isAuthorized ? (
        <Component />
      ) : (
        <Navigate to="/sign-in" />
      )}
    </React.Fragment>
  );
};

export default PrivateRoute;
