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
    menucmp:           'component/menucmp',
    expenseEditor:     'component/expense-editor',
    shinyConfig:       'utils/config'
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

/**------------------------------------------------------------------
 * This is the bootloader entry point of the application.
 * Controllers module must be setted has dependencies here since
 * they are loaded dynamically. When running the optimizer, these
 * dependencies will then be included.
 *-------------------------------------------------------------------
 * @module _main
 * **/
requirejs([
  'jquery',
  'bootstrap',
  'facade',
  // BEGIN controllers-----------------------------------------------
  'welcome',
  'createAccount'
  // END controllers-------------------------------------------------
],
/**
 * Entry point
 */
function($, bootstrap, Facade) {
  'use strict';

  var params = {
    debugMode: window.skinyDebugMode || false,
    version: '0.0.1'
  },
  facade;

  facade = new Facade();
  facade.initialize(params);
  facade.boot();
});
