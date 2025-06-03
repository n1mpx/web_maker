import api from '../api/axios';

export const sendLoginCode = (email: string) => {
  return api.post('/auth/login/', { email });
};

export const confirmLoginCode = (email: string, code: string) => {
  return api.post('/auth/confirm/', { email, code });
};

export const getUserInfo = () => {
  return api.get('/auth/me/'); // или '/users/me/', зависит от твоего backend'а
};
