import Base from 'simple-auth/authenticators/base';
import Configuration from './../configuration';

var Tok = Base.extend({
  serverAuthenticateEndpoint: '/login',
  modelName: 'user',
  tokenAttributeName: 'token',

  init: function() {
    this.serverAuthenticateEndpoint = Configuration.serverAuthenticateEndpoint;
    this.modelName = Configuration.modelName;
    this.tokenAttributeName = Configuration.tokenAttributeName;
  },
  
  authenticate: function(credentials) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var data = {};
      
      data[_this.modelName] = {
        email: credentials.email,
        password: credentials.password
      };

      _this.executeRequest(data).then(function() {
        Ember.run(function() {
          resolve(response);
        });
      }, function(xhr, status, error) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  executeRequest: function(data, resolve, reject) {
    return Ember.$.ajax({
      url: this.serverAuthenticateEndpoint,
      type: 'POST',
      data: data,
      dataType: 'json',
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('Accept', settings.accepts.json);
      }
    });
  }
});

export default Tok;
