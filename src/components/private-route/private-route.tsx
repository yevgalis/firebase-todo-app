import { Route, RouteProps } from 'react-router-dom';
import { FC } from 'react';
import { useAuth } from '@/authContext';

type TProps = {
  children: React.ReactNode;
} & RouteProps;

const PrivateRoute: FC<TProps> = ({ children }: TProps) => {
  const { isAuthorized } = useAuth();

  if (isAuthorized === null) {
    return <div>Authorizing...</div>;
  }

  return (
    <Route>
      {children}
    </Route>
  );
};

export default PrivateRoute;
