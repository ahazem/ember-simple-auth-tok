import Configuration from 'simple-auth-tok/configuration';

describe('Configuration', function() {
  describe('serverTokenEndPoint', function() {
    it('defaults to /login', function() {
      expect(Configuration.serverTokenEndPoint).to.eq('/login');
    });
  });
});
