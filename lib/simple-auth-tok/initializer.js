import Authenticator from '/simple-auth-tok/authenticators/tok';
import Authorizer from '/simple-auth-tok/authorizers/tok';
import Configuration from './configuration';

import getGlobalConfig from 'simple-auth/utils/get-global-config';

var Initializer = {
  name: 'simple-auth-tok',
  before: 'simple-auth',
  initialize: function(container, application) {
    Configuration.load(container, getGlobalConfig('simple-auth-tok'));

    container.register('simple-auth-authorizer:tok', Authorizer);
    container.register('simple-auth-authenticator:tok', Authenticator);
  }
};

export default Initializer;
