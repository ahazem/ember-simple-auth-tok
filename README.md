# Ember Simple Auth Tok

This is an extension to the [Ember Simple Auth](https://github.com/simplabs/ember-simple-auth) library that provides an authenticator and authorizer that are compatible with Ruby on Rails token-based authentication plugin [Tok](https://github.com/ahazem/tok).

## Server-side setup

Refer to [Tok](https://github.com/ahazem/tok)'s repository for more information on how to get Tok working with a Rails::API app.

## Installation

To install Ember Simple Auth Tok in an Ember.js application you have three options:

- If you are using [Ember CLI](https://github.com/stefanpenner/ember-cli), just add the [Ember CLI addon](https://github.com/ahazem/ember-cli-simple-auth-tok) to your project (just run the two installation commands and you're all set).

- Ember Simple Auth Tok is also packaged as a [bower component](https://github.com/ahazem/ember-simple-auth-tok-component), offering an AMD build in addition to a browserified version. If you're using the AMD build from bower, be sure to require the autoloader as follows:

```
require('/simple-auth-tok/ember');
```

- You can also download a pre-built version from the [releases](https://github.com/ahazem/ember-simple-auth-tok/releases) page.

## License

See [LICENSE](https://github.com/ahazem/ember-simple-auth-tok/blob/master/LICENSE).
