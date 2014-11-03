import Tok from '/simple-auth-tok/authorizers/tok';
import Session from 'simple-auth/session';
import EphemeralStore from 'simple-auth/stores/ephemeral';
import Configuration from '/simple-auth-tok/configuration';

describe('Tok', function() {
  beforeEach(function() {
    this.session = Session.create();
    this.session.setProperties({ store: EphemeralStore.create() });

    this.authorizer = Tok.create();
    this.authorizer.set('session', this.session);

    this.request = { setRequestHeader: function() {} };
    sinon.spy(this.request, 'setRequestHeader');
  });

  describe('initialization', function() {
    it('assigns tokenAttributeName from configuration', function() {
      Configuration.tokenAttributeName = 'tokenAttributeName';

      expect(Tok.create().tokenAttributeName).to.eq('tokenAttributeName');
    });

    afterEach(function() {
      Configuration.load({}, {});
    });
  });

  describe('#authorize', function() {
    describe('when the session is authenticated', function() {
      beforeEach(function() {
        this.authorizer.set('session.isAuthenticated', true);
      });

      describe('when the session contains non-empty authentication token', function() {
        beforeEach(function() {
          this.authorizer.set('session.token', 'secret token');
        });

        it('adds the authentication token in the request headers', function() {
          this.authorizer.authorize(this.request, {});

          expect(this.request.setRequestHeader).to.have.been.calledWith('Authorization', 'Token token="secret token"');
        });
      });

      describe('when custom token is used', function() {
        beforeEach(function() {
          Configuration.tokenAttributeName = 'employee_token';

          this.authorizer = Tok.create();
        });

        describe('when the session contains non-empty custom token', function() {
          beforeEach(function() {
            this.authorizer.set('session', this.session);
            this.authorizer.set('session.employee_token', 'secret token');
          });

          it('adds the employee_token in the request headers', function() {
            this.authorizer.authorize(this.request, {});

            expect(this.request.setRequestHeader).to.have.been.calledWith('Authorization', 'Token employee_token="secret token"');
          });
        });

        afterEach(function() {
          Configuration.load({}, {});
        });
      });

      describe('when the session does not contain authentication token', function() {
        beforeEach(function() {
          this.authorizer.set('session.token', null);
        });

        it('does not authorize the request', function() {
          this.authorizer.authorize(this.request, {});

          expect(this.request.setRequestHeader).to.not.have.been.called;
        });
      });
    });

    describe('when the session is not authenticated', function() {
      beforeEach(function() {
        this.authorizer.set('session.isAuthenticated', false);
      });

      it('does not authorize the request', function() {
        this.authorizer.authorize(this.request, {});

        expect(this.request.setRequestHeader).to.not.have.been.called;
      });
    });
  });
});
