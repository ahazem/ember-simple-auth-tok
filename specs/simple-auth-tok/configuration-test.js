import Configuration from '/simple-auth-tok/configuration';

describe('Configuration', function() {
  describe('serverAuthenticateEndpoint', function() {
    it('defaults to /login', function() {
      expect(Configuration.serverAuthenticateEndpoint).to.eq('/login');
    });
  });

  describe('serverInvalidateEndpoint', function() {
    it('defaults to /logout', function() {
      expect(Configuration.serverInvalidateEndpoint).to.eq('/logout');
    });
  });

  describe('modelName', function() {
    it('defaults to "user"', function() {
      expect(Configuration.modelName).to.eq('user');
    });
  });

  describe('tokenAttributeName', function() {
    it('defaults to "token"', function() {
      expect(Configuration.tokenAttributeName).to.eq('token');
    });
  });

  describe('.load', function() {
    it('sets serverAuthenticateEndpoint correctly', function() {
      Configuration.load(this.container, { serverAuthenticateEndpoint: '/sign_in' });

      expect(Configuration.serverAuthenticateEndpoint).to.eq('/sign_in');
    });

    it('sets serverInvalidateEndpoint correctly', function() {
      Configuration.load(this.container, { serverInvalidateEndpoint: '/sign_out' });

      expect(Configuration.serverInvalidateEndpoint).to.eq('/sign_out');
    });

    it('sets modelName correctly', function() {
      Configuration.load(this.container, { modelName: 'account' });

      expect(Configuration.modelName).to.eq('account');
    });

    it('sets tokenAttributeName correctly', function() {
      Configuration.load(this.container, { tokenAttributeName: 'authenticationToken' });

      expect(Configuration.tokenAttributeName).to.eq('authenticationToken');
    });
  });
});
