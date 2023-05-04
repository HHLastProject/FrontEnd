export const getToken = () => {
  const token = localStorage.getItem('access_token');
  return token;
};

export const deleteToken = () => {
  localStorage.removeItem('access_token');
};