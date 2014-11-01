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
});
