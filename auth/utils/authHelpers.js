const getAccessToken = (auth) => {
  if (!auth) throw new Error();
  if (!auth.startsWith("Bearer")) throw new Error();
  return auth.split(" ")[1];
};

module.exports = { getAccessToken };
