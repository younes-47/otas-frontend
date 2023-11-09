const DevConfig = {
  BACKEND_SERVER_PROTOCOL: 'http',
  BACKEND_SERVER_IP: 'DIPC10EJQB',
  BACKEND_SERVER_PORT: '3791',
};
const ProdConfig = {
  BACKEND_SERVER_PROTOCOL: 'https',
  BACKEND_SERVER_IP: 'makendika-ap01',
  BACKEND_SERVER_PORT: '3791',
};
const TestConfig = {
  BACKEND_SERVER_PROTOCOL: 'https',
  BACKEND_SERVER_IP: 'makendika-ap-test',
  BACKEND_SERVER_PORT: '3791',
};
/// //////////////////////////// ///
/// /////Change value below///// ///
/// //////////////////////////// ///
const environement = 'TEST';
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
