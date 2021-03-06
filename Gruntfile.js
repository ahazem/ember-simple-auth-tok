module.exports = function(grunt) {
  this.registerTask('default', ['test']);

  this.registerTask('test', 'Execute tests.', [
    'jshint',
    'clean',
    'transpile',
    'concat',
    'mocha'
  ]);

  this.registerTask('build:bower', 'Build the extension for bower.', [
    'concat:browser',
    'copy:component'
  ]);

  this.initConfig({
    watch: {
      files: ['lib/**/*', 'specs/**/*', 'Gruntfile.js'],
      tasks: ['jshint', 'clean', 'transpile', 'concat', 'mocha']
    },

    jshint: {
      library: 'lib/**/*.js',
      specs: 'specs/**/*.js',
      options: {
        esnext: true,
        expr: true
      }
    },

    clean: {
      tmp: ['tmp']
    },

    transpile: {
      library: {
        type: 'amd',
        files: [{
          expand: true,
          cwd: 'lib',
          src: ['**/*.js'],
          dest: 'tmp/lib'
        }]
      },
      specs: {
        type: 'amd',
        files: [{
          expand: true,
          cwd: 'specs',
          src: ['**/*.js'],
          dest: 'tmp/specs',
        }]
      }
    },

    concat: {
      amd: {
        src: ['wrap/amd.start', 'wrap/register-library', 'tmp/lib/simple-auth-tok/**/*.js', 'wrap/amd.end'],
        dest: 'tmp/simple-auth-tok.amd.js'
      },
      browser: {
        src: ['wrap/browser.start', 'wrap/register-library', 'test/lib/loader.js', 'tmp/lib/simple-auth-tok/**/**.js', 'wrap/browser.end'],
        dest: 'tmp/simple-auth-tok.js'
      },
      specs: {
        src: ['wrap/amd.start', 'wrap/register-library', 'tmp/specs/simple-auth-tok/**/*.js', 'wrap/amd.end'],
        dest: 'tmp/simple-auth-tok-specs.amd.js'
      }
    },

    copy: {
      component: {
        files: [{
          expand: true,
          cwd: 'tmp/',
          src: ['simple-auth-tok.js', 'simple-auth-tok.amd.js'],
          dest: '../ember-simple-auth-tok-component'
        }]
      },
    },

    mocha: {
      specs: {
        src: ['test/testrunner.html'],
        options: {
          run: true,
          reporter: 'Spec'
        }
      }
    }
  });

  this.loadNpmTasks('grunt-mocha');
  this.loadNpmTasks('grunt-es6-module-transpiler');
  this.loadNpmTasks('grunt-contrib-clean');
  this.loadNpmTasks('grunt-contrib-concat');
  this.loadNpmTasks('grunt-contrib-copy');
  this.loadNpmTasks('grunt-contrib-jshint');
  this.loadNpmTasks('grunt-contrib-watch');
};
