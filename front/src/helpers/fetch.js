export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const url = `${baseUrl}/${endpoint}`;

  if (method === 'GET') return await fetch(url);
  else {
    return await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = async (endpoint, data, method = 'GET') => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const url = `${baseUrl}/${endpoint}`;

  if (method === 'GET')
    return await fetch(url, {
      method,
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
    });
  else {
    return await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || '',
      },
      body: JSON.stringify(data),
    });
  }
};
