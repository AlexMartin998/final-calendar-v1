import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { uid } = useSelector(state => state.auth);

  // Si NO me viene auth (!uid) le envio a las rutas hijas. Si me viene auth (uid) lo envio al home y q NO puede var el login xq ya esrta auth
  return !uid ? children : <Navigate to="/" />;
};
