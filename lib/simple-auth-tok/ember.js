import Initializer from './initializer';

Ember.onload('Ember.Application', function(Application) {
  Application.initializer(Initializer);
});
