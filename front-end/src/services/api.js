import { useNavigate } from 'react-router-dom';
import TOKEN from '../utils/utils';

export const BASE_URL = 'http://localhost:3001';

export default async function api(url, options) {
  const accessToken = localStorage.getItem(TOKEN);
  const navigate = useNavigate();

  await fetch(BASE_URL + url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      ...options.headers,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        localStorage.removeItem(TOKEN);
        navigate('/login');
        window.location.href = '/login';
      }
    })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
}
