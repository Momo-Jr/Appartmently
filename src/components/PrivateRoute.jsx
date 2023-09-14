import { Navigate, Outlet } from 'react-router-dom';
import useAuthHook from '../hooks/useAuthHook';
import Spinner from './Spinner';
const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuthHook();

  if (checkStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
