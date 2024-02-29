const DevConfig = {
  BACKEND_SERVER_PROTOCOL: 'http',
  BACKEND_SERVER_IP: 'DI3142DZ3',
  BACKEND_SERVER_PORT: '5030',
};
const ProdConfig = {
  BACKEND_SERVER_PROTOCOL: 'https',
  BACKEND_SERVER_IP: 'otas.dicastalma.com',
  BACKEND_SERVER_PORT: '3216',
};
const TestConfig = {
  BACKEND_SERVER_PROTOCOL: 'https',
  BACKEND_SERVER_IP: 'otastest.dicastalma.com',
  BACKEND_SERVER_PORT: '3216',
};
/// //////////////////////////// ///
/// /////Change value below///// ///
/// //////////////////////////// ///
const environement = 'DEV';
/// //////////////////////////// ///
/// /////Change value above///// ///
/// //////////////////////////// ///
const backendAdress = () => {
  let config;
  if (environement === 'PROD') {
    config = ProdConfig;
  }
  if (environement === 'DEV') {
    config = DevConfig;
  }
  if (environement === 'TEST') {
    config = TestConfig;
  }
  const address = `${config.BACKEND_SERVER_PROTOCOL}://${config.BACKEND_SERVER_IP}:${config.BACKEND_SERVER_PORT}/api/`;
  return address;
};

export default backendAdress;
