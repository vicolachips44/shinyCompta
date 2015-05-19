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

requirejs([
    'jquery',     // unsure that jquery is loaded prior to anything
    'bootstrap',  // same thing for bootstrap js
    'facade',
    // controller dependencies
    // must be added here since they are loaded dynamically (see welcome::load)
    // and the optimizer will not see them unless we require them here!
    'welcome',
    'createAccount'
], function($, bootstrap, Facade) {
  // since the app is run from bootloader.js
  // the window.skinyDebugMode value is setted.
  // after optimisation this value will be undefined so by default debug mode
  // is false.
  var params = {
    debugMode: window.skinyDebugMode || false,
    version: '0.0.1'
  },
  facade;

  facade = new Facade();
  facade.initialize(params);
  facade.boot();
});
