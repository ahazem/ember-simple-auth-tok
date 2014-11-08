import Tok from '/simple-auth-tok/authenticators/tok';
import Configuration from '/simple-auth-tok/configuration';

describe('Tok', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.server.autoRespond = true;
    this.authenticator = Tok.create();
  });

  describe('initialization', function() {
    it('assigns serverAuthenticateEndpoint from configuration', function() {
      Configuration.serverAuthenticateEndpoint = 'serverAuthenticateEndpoint';

      expect(Tok.create().serverAuthenticateEndpoint).to.eq('serverAuthenticateEndpoint');
    });

    it('assigns serverInvalidateEndpoint from configuration', function() {
      Configuration.serverInvalidateEndpoint = 'serverInvalidateEndpoint';

      expect(Tok.create().serverInvalidateEndpoint).to.eq('serverInvalidateEndpoint');
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

  describe('#restore', function() {
    beforeEach(function() {
      this.server.respondWith('POST', '/login', [
        201,
        { 'Content-Type': 'application/json' },
        ' {"token": "secret token" } '
      ]);
    });

    describe('when data contains authentication token', function() {
      it('resolves with correct token', function(done) {
        this.authenticator.restore({ "token": "secret token" }).then(function(content) {
          expect(content).to.eql({ "token": "secret token" });

          done();
        });
      });
    });

    describe('when data contains custom token', function() {
      beforeEach(function() {
        Configuration.tokenAttributeName = 'employee.token';
        this.authenticator = Tok.create();
      });

      it('resolves with correct token', function(done) {
        this.authenticator.restore({ employee: { token: "secret token" } }).then(function(content) {
          expect(content).to.eql({ employee: { token: "secret token" } });

          done();
        });
      });

      afterEach(function() {
        Configuration.load({}, {});
      });
    });
  });

  describe('#authenticate', function() {
    beforeEach(function() {
      sinon.spy(Ember.$, 'ajax');
    });

    it('sends a POST request to the server authenticate endpoint', function(done) {
      this.authenticator.authenticate({ identification: 'an@email.com', password: '123456' });

      Ember.run.next(function() {
        var args = Ember.$.ajax.getCall(0).args[0];
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

    describe('when authentication request is successful', function() {
      beforeEach(function() {
        this.server.respondWith('POST', '/login', [
          201,
          { 'Content-Type': 'application/json' },
          '{ "token": "secret token" }'
        ]);
      });

      it('resolves with correct token', function(done) {
        this.authenticator.authenticate({ identification: 'an@email.com', password: '123456' }).then(function(data) {
          expect(data).to.eql({ token: 'secret token' });

          done();
        });
      });
    });

    describe('when authentication request is not successful', function() {
      beforeEach(function() {
        this.server.respondWith('POST', '/login', [
          422,
          { 'Content-Type': 'application/json' },
          '{ "error": "Invalid email or password!" }'
        ]);
      });

      it('rejects with correct error', function(done) {
        this.authenticator.authenticate({ identification: 'wrong@email.com', password: 'incorrect password' }).then(null, function(error) {
          expect(error).to.eql({ "error": "Invalid email or password!" });

          done();
        });
      });
    });

    afterEach(function() {
      Ember.$.ajax.restore();
    });
  });

  describe('#invalidate', function() {
    beforeEach(function() {
      sinon.spy(Ember.$, 'ajax');
    });

    it('sends a DELETE request to the server invalidate endpoint', function(done) {
      this.authenticator.invalidate({});

      Ember.run.next(function() {
        var args = Ember.$.ajax.getCall(0).args[0];
        delete args.beforeSend;

        expect(args).to.eql({
          url: '/logout',
          type: 'DELETE',
          data: {},
          dataType: 'json'
        });

        done();
      });
    });
  });
});
