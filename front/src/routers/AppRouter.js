import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector(state => state.auth);

  // Cada vez que se recarga se genera 1 nuevo jwt
  // Podemo establecer otra logica
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) return <h5>Loading...</h5>;

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <CalendarScreen />
              </PrivateRoute>
            }
          />

          {/* Redireccionar al login si NO existe la URL */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
};
