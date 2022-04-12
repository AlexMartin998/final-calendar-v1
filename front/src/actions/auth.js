import Swal from 'sweetalert2';

import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
  return async dispatch => {
    const resp = await fetchWithoutToken(
      'auth/login',
      { email, password },
      'POST'
    );
    const body = await resp.json();
    if (!body.ok) return Swal.fire('Error', body.msg, 'error');

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    dispatch(
      login({
        uid: body.user?.uid,
        name: body.user?.name,
      })
    );
  };
};

const login = user => ({
  type: types.authLogin,
  payload: user,
});

export const startRegister = (email, password, name) => {
  return async dispatch => {
    const resp = await fetchWithoutToken(
      'auth/signup',
      { email, password, name },
      'POST'
    );
    const body = await resp.json();
    console.log(body);
    // if (!body.ok) return Swa.fire('Error', body.errors[0].msg, 'error');
    if (!body.ok)
      return Swal.fire(
        'Error',
        body.errors.map(e => e.msg).join(' | '),
        'error'
      );

    dispatch(register());
    Swal.fire('Successfully registered!', 'Successfully registered', 'success');
  };
};

const register = () => ({
  type: types.authStartRegister,
});

export const startChecking = () => {
  return async dispatch => {
    const resp = await fetchWithToken('auth/renew');
    const body = await resp.json();
    if (!body.ok) {
      dispatch(checkingFinish());
    }

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(
      login({
        uid: body.user?.uid,
        name: body.user?.name,
      })
    );
  };
};

const checkingFinish = () => ({
  type: types.authChekingFinish,
});

export const startLogout = () => {
  return dispatch => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
