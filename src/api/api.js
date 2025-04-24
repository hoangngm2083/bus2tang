const api = async (url) => {
  const res = await fetch(url);
  const result = await res.json();
  const data = result.data;
  const message = result.message;
  return { data, message };
};

export default api;
