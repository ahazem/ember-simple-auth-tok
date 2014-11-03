import loadConfig from 'simple-auth/utils/load-config';

var defaults = {
  serverAuthenticateEndpoint: '/login',
  modelName: 'user',
  tokenAttributeName: 'token'
};

var Configuration = {
  serverAuthenticateEndpoint: defaults.serverAuthenticateEndpoint,
  modelName: defaults.modelName,
  tokenAttributeName: defaults.tokenAttributeName,

  load: loadConfig(defaults)
};

export default Configuration;
