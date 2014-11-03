import Base from 'simple-auth/authorizers/base';
import Configuration from './../configuration';

var Tok = Base.extend({
  tokenAttributeName: 'token',

  init: function() {
    this.tokenAttributeName = Configuration.tokenAttributeName;
  },

  authorize: function(jqXHR, requestOptions) {
    var token = this.get('session').get(this.tokenAttributeName);

    if(this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      jqXHR.setRequestHeader('Authorization', 'Token ' + this.tokenAttributeName + '="' + token + '"');
    }
  }
});

export default Tok;
