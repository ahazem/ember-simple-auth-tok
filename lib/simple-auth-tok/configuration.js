import loadConfig from 'simple-auth/utils/load-config';

var defaults = {
  serverAuthenticateEndpoint: '/login',
  serverInvalidateEndpoint: '/logout',
  modelName: 'user',
  tokenAttributeName: 'token'
};

var Configuration = {
  serverAuthenticateEndpoint: defaults.serverAuthenticateEndpoint,
  serverInvalidateEndpoint: defaults.serverInvalidateEndpoint,
  modelName: defaults.modelName,
  tokenAttributeName: defaults.tokenAttributeName,

  load: loadConfig(defaults)
};

export default Configuration;
