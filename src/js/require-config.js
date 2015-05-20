requirejs.config({
  paths: {
    text:              '../vendor/requirejs-text/text',
    jquery:            '../vendor/jquery/dist/jquery',
    bootstrap:         '../vendor/bootstrap/dist/js/bootstrap',
    knockout:          '../vendor/knockout/dist/knockout.debug',
    underscore:        '../vendor/underscore/underscore',
    bootbox:           '../vendor/bootbox/bootbox',
    toastr:            '../vendor/toastr/toastr',
    cldr:              '../vendor/cldrjs/dist/cldr',
    globalize:         '../vendor/globalize/dist/globalize',
    facade:            'facade',
    logger:            'utils/logger',
    language:          'utils/language',
    welcome:           'controller/welcome',
    createAccount:     'controller/create-account',
    locallydb:         'db/locallydb',
    locallydblist:     'db/locallydb-list',
    locallydbcol:      'db/locallydb-col',
    skinydb:           'db/skinydb',
    account:           'model/account',
    accountType:       'model/account-type',
    thirdparty:        'model/thirdparty',
    expense:           'model/expense',
    accountValidator:  'validator/account',
    expenseValidator:  'validator/expense',
    menuViewModel:     'component/menuview-model'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    bootstrap: {
      deps: ['jquery']
    },
    underscore: {
      exports: '_'
    },
    knockout: {
      deps: ['jquery'],
      exports: 'ko'
    },
    bootbox: {
      deps: ['jquery', 'bootstrap'],
      exports: 'bootbox'
    },
    toastr: {
      deps: ['jquery'],
      exports: 'toastr'
    }
  },
  skiny: {
    debugMode: true
  }
});

/** @module _main **/
requirejs([
    'jquery',
    'bootstrap',
    'facade',
    // controllers
    'welcome',
    'createAccount'
],
/** @function
 *
 * <p>Requirejs entry point is here. We make sure that
 * jquery is loaded before starting up the application.
 * The entry point of this application is Facade object (@see module:Facade).
 * Since controllers are loaded inside the body of Facade instance
 * we must require them here in order that the optimizer (the tool
 * to minimize JS) will insert them in the flow.</p>
 *
 * <p>The only reference to js in the index.html is a file called bootloader.js
 * In developpment cycle, this file only loads the require-config file
 * and sets a top level value to put the environment in debug mode.
 * In production cycle, the bootloader.js file becomes the result of the
 * optimizer requirejs process. Then, the <b>skinyDebugMode</b> property
 * will not be defined. That is used  by the logger object to set the log level
 * property.</p>
 * <h4>startup function to boot the application.</h4>
 *
 * @see module:facade The facade is the main entry point
 *
 * @param {object} $ the jquery instance
 * @param {object} bootstrap the bootstrap js part
 * @param {object} the Facade object
 */
function($, bootstrap, Facade) {
  var params = {
    debugMode: window.skinyDebugMode || false,
    version: '0.0.1'
  },
  facade;

  facade = new Facade();
  facade.initialize(params);
  facade.boot();
});
