# Ember Simple Auth Tok

This is an extension to the [Ember Simple Auth](https://github.com/simplabs/ember-simple-auth) library that provides an authenticator and authorizer that are compatible with Ruby on Rails token-based authentication plugin [Tok](https://github.com/ahazem/tok).

## Installation

To install Ember Simple Auth Tok in an Ember.js application you have three options:

* If you are using [Ember CLI](https://github.com/stefanpenner/ember-cli), just add the [Ember CLI addon](https://github.com/ahazem/ember-cli-simple-auth-tok) to your project (run the two installation commands and you're all set).

* Ember Simple Auth Tok is also packaged as a [bower component](https://github.com/ahazem/ember-simple-auth-tok-component), offering an AMD build in addition to a browserified version. If you're using the AMD build from bower, be sure to require the autoloader as follows:

  ```js
  require('/simple-auth-tok/ember');
  ```

* You can also download a pre-built version from the [releases](https://github.com/ahazem/ember-simple-auth-tok/releases) page.

## Usage

This section explains how to use the extension along with [Ember Simple Auth](https://github.com/simplabs/ember-simple-auth) and [Tok](https://github.com/ahazem/tok).

### Server-side setup

Refer to [Tok](https://github.com/ahazem/tok)'s repository for more information on how to get Tok working with a Rails::API app.

### Client-side setup


## Contributing

Contributes are welcome. Please follow the instructions below to get started:

* Fork the repository.

* Create a branch for your edits, e.g. `git checkout -b fix-authentication`.

* Usually, you're expected to write tests for your changes. Please refer to the section below on how to get tests running. 

* Make any necessary changes to the documentation to reflect your changes.

* Submit a pull request. Please be sure to include a descriptive title and some information about the changes you've made, why they should be included and soon.

### Running tests

To run tests, you need to have [node.js](http://nodejs.org) and [bower](http://bower.io) installed. If you have those, simply run:

```
git clone https://github.com/ahazem/ember-simple-auth-tok
```

then `cd` into `ember-simple-auth-tok`:

```
cd ember-simple-auth-tok
```

and install npm dependencies:

```
npm install -D
```

and bower dependencies as well:

```
bower install
```

then you can run the following command:

```
grunt test
```

## License

See [LICENSE](https://github.com/ahazem/ember-simple-auth-tok/blob/master/LICENSE).
