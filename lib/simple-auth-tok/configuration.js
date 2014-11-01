import loadConfig from 'simple-auth/utils/load-config';

var defaults = {
  serverTokenEndpoint: '/login',
  modelName: 'user',
  tokenAttributeName: 'token'
};

var Configuration = {
  serverTokenEndpoint: defaults.serverTokenEndpoint,
  modelName: defaults.modelName,
  tokenAttributeName: defaults.tokenAttributeName,

  load: loadConfig(defaults)
};

export default Configuration;
