define([
  'jquery',
  'knockout',
  'underscore',
  'logger',
  'language',
  'skinydb',
  'shinyConfig',
  'menucmp'
],
/**
 * The facade module contains the Facade object witch is a centric object
 * within the application. The Facade object contains links to:
 * <ul>
 *  <li>The nwjs Application instance</li>
 *  <li>The nwjs Window instance</li>
 *  <li>The logging system</li>
 *  <li>The language tool object</li>
 *  <li>The database layer</li>
 * </ul>
 * The Facade exposes single observable type property that is updated
 * whenever the controller is about to change.
 *
 * @exports Facade
 *
 * @param {object} $ the jquery instance
 * @param {object} _ the underscore instance
 */
function($, ko, _, Logger, Language, SkinyDb, Config) {

  'use strict';

  var
    nwgui = require('nw.gui'),
    nwWindow = nwgui.Window.get(),
    _this,

    /**
     * function to handle the icon on the task bar when minimized
     */
    _minimizeRoutine = function() {
      _this.logger.debug('minimize routine started...');
      this.hide();
      var tray = new nwgui.Tray({icon: 'resources/icon.png'});

      tray.on('click', function() {
        nwWindow.show();
        this.remove();
        tray = null;
        _this.logger.debug('window has been restored...');
      });
    },

    /**
     * function to register knockout components and custom bindings
     */
    _loadKoComp = function() {
      // @warning menucmp is a dependency off this module
      ko.components.register('tca-menu', {require: 'menucmp'});
    }
    ; /** private stuff END **/

  /**
   * Default constructor
   *
   * @constructor
   */
  function Facade() {
    _this = this;
  }

  /**
   * Facade members instance
   *
   * @prototype
   */
  Facade.prototype = {
    constructor: Facade,

    /**
     * <h4>all initialization routines goes here.</h4>
     * Get a pointer to nwjs App instance, a pointer on nwWindow instance.
     * Initialize the logger object, the language object, the dbObject.
     * Has two observable. The first is for the active selected account, the second
     * is a context value that changes when a new controller is loaded.
     *
     * @param {object} params Parameters for the application.
     *
     */
    initialize: function(params) {

      /** @property params {object} the parameters value of the application */
      this.params        = params;

      /** @property apps {object} the nwjs application object */
      this.app           = nwgui.App;

      /** @property win {object} the nwjs window object */
      this.win           = nwWindow;

      /** @property debugMode {boolean} debug mode flag */
      this.debugMode     = params.debugMode;

      /** @property logger {object} The Logger object instance */
      this.logger        = new Logger(this);

      /** @property lng {object} The Language object instance */
      this.lng           = new Language(this);

      /** @property db {object} The db object instance */
      this.db            = new SkinyDb(this);

      /** @property context {Observable} The knockout binding for the controller context value */
      this.context       = ko.observable('');

      this.config        = new Config(
        require('path').join(this.app.dataPath, 'shinyCompta.json'),
        this
      );

      /** @property menu the menu component **/
      this.menu          = {};

      // maximize the window if it was...
      if (this.config.configObj.winMaximized) {
        this.win.maximize();
      }

      this.win.on('minimize', _minimizeRoutine);

      _loadKoComp();

      ko.applyBindings(this, $('#ko_main_menu')[0]);

      // brings the window to front
      this.win.focus();
    },

    /**
     * Gets the controller instance from the view and load it.
     * The controller name is defined in the view layer inside a div element called #ko_active_controller
     * We use requirejs closure mecanism to invoke its load method.
     *
     * @param data {any} additional element that the controller might require.
     */
    boot: function(data) {

      var ctrl = $('#ko_active_controller').data('value'), binding = null;
      this.logger.trace('active controller instance name is ' + ctrl);

      requirejs([ctrl], function(Ctrl) {
        _this.logger.trace('cleaning bindings before running controller ' + ctrl);

        binding = $('#ko_page_content')[0];
        ko.cleanNode(binding);

        _this.context(ctrl);

        var ctl = new Ctrl(_this);
        ctl.load(data);
      });
    },

    /**
     * Redirect will get the value of the controller name
     * and load it.
     *
     * @param {string} ctlname the name of the controller
     * @param {mixed}  data    any data relevant for the invoked controller
     *
     * @return void
     */
    redirect: function(ctlname, data) {
      $('#ko_active_controller').data('value', ctlname);
      this.boot(data);
    },

    doQuit: function() {
      this.config.save();
      this.logger.trace('configuration saved to file');
      this.app.quit();
    }
  };

  return Facade;

});
