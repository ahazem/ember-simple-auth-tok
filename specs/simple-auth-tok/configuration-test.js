import Configuration from '/simple-auth-tok/configuration';

describe('Configuration', function() {
  describe('serverTokenEndpoint', function() {
    it('defaults to /login', function() {
      expect(Configuration.serverTokenEndpoint).to.eq('/login');
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
    it('sets serverTokenEndpoint correctly', function() {
      Configuration.load(this.container, { serverTokenEndpoint: '/sign_in' });

      expect(Configuration.serverTokenEndpoint).to.eq('/sign_in');
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
