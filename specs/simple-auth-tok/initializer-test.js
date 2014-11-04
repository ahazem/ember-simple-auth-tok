import Initializer from '/simple-auth-tok/initializer';
import Authenticator from '/simple-auth-tok/authenticators/tok';
import Authorizer from '/simple-auth-tok/authorizers/tok';

describe('the "simple-auth-tok" initializer', function() {
  it('has the correct name', function() {
    expect(Initializer.name).to.eq('simple-auth-tok');
  });

  it('runs before the "simple-auth" initializer', function() {
    expect(Initializer.before).to.eq('simple-auth');
  });

  describe('#initializer', function() {
    beforeEach(function() {
      this.container = { register: function() {} };
      sinon.spy(this.container, 'register');
      Initializer.initialize(this.container);
    });

    it('registers the authorizer with the Ember container', function() {
      var spyCall = this.container.register.getCall(0);

      expect(spyCall.args[0]).to.eql('simple-auth-authorizer:tok');
      expect(spyCall.args[1]).to.eql(Authorizer);
    });

    it('registers the authenticator with the Ember container', function() {
      var spyCall = this.container.register.getCall(1);

      expect(spyCall.args[0]).to.eql('simple-auth-authenticator:tok');
      expect(spyCall.args[1]).to.eql(Authenticator);
    });
  });
});
