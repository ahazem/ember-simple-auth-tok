import Base from 'simple-auth/authenticators/base';
import Configuration from './../configuration';

var Tok = Base.extend({
  serverAuthenticateEndpoint: '/login',
  serverInvalidateEndpoint: '/logout',
  modelName: 'user',
  tokenAttributeName: 'token',

  init: function() {
    this.serverAuthenticateEndpoint = Configuration.serverAuthenticateEndpoint;
    this.serverInvalidateEndpoint = Configuration.serverInvalidateEndpoint;
    this.modelName = Configuration.modelName;
    this.tokenAttributeName = Configuration.tokenAttributeName;
  },

  restore: function(properties) {
    var _this = this;
    var propertiesObject = Ember.Object.create(properties);

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if(!Ember.isEmpty(propertiesObject.get(_this.tokenAttributeName))) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },
  
  authenticate: function(credentials) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var data = {};
      
      data[_this.modelName] = {
        email: credentials.email,
        password: credentials.password
      };

      _this.executeRequest(data, 'POST', _this.serverAuthenticateEndpoint).then(function(response) {
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

  invalidate: function(data) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.executeRequest({}, 'DELETE', _this.serverInvalidateEndpoint).then(function(response) {
        Ember.run(function() {
          resolve(response);
        });
      }, function(xhr, status, error) {
        Ember.run(function() {
          reject(xhr.reponseJSON || xhr.responseText);
        });
      });
    });
  },

  executeRequest: function(data, type, url, resolve, reject) {
    return Ember.$.ajax({
      url: url,
      type: type, 
      data: data,
      dataType: 'json',
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('Accept', settings.accepts.json);
      }
    });
  }
});

export default Tok;
