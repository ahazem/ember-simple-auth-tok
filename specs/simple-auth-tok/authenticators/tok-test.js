import Tok from '/simple-auth-tok/authenticators/tok';
import Configuration from '/simple-auth-tok/configuration';

describe('Tok', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.server.autoRespond = true;
    this.authenticator = Tok.create();
  });

  describe('initialization', function() {
    it('assigns serveTokenEndpoint from configuration', function() {
      Configuration.serverTokenEndpoint = 'serverTokenEndpoint';

      expect(Tok.create().serverTokenEndpoint).to.eq('serverTokenEndpoint');
    });

    it('assigns modelName from configuration', function() {
      Configuration.modelName = 'modelName';

      expect(Tok.create().modelName).to.eq('modelName');
    });

    it('assigns tokenAttributeName from configuration', function() {
      Configuration.tokenAttributeName = 'tokenAttributeName';

      expect(Tok.create().tokenAttributeName).to.eq('tokenAttributeName');
    });

    afterEach(function() {
      Configuration.load({}, {});
    });
  });

  describe('#authenticate', function() {
    beforeEach(function() {
      sinon.spy(Ember.$, 'ajax');
    });

    it('sends an AJAX request to the server token endpoint', function(done) {
      this.authenticator.authenticate({ email: 'an@email.com', password: '123456' });

      Ember.run.next(function() {
        var args = Ember.$.ajax.getCall(0).args[0];
        console.log(args);

        delete args.beforeSend;

        console.log(args);

        expect(args).to.eql({
          url: '/login',
          type: 'POST',
          data: { user: { email: 'an@email.com', password: '123456' } },
          dataType: 'json'
        });

        done();
      });
    });
  });
});
