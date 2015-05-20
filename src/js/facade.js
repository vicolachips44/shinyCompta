define([
  'jquery',
  'knockout',
  'underscore',
  'logger',
  'language',
  'skinydb',
  'menuViewModel'],
/**
 * This module is the main entry point of the application.
 *
 * @exports Facade
 *
 * @param {object} $ the jquery instance
 * @param {object} _ the underscore instance
 */
function($, ko, _, Logger, Language, SkinyDb, MenuViewModel) {

  var
    nwgui = require('nw.gui'),
    fs = require('fs'),
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
      var tpl = fs.readFileSync('templates/component/menuView.html', 'utf-8');
      ko.components.register('tca-menu', {
        viewModel: MenuViewModel,
        template: tpl
      });
    }
    ; /** private stuff END **/

  /**
   * Declare a _this pointer
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

      this.params        = params;
      this.app           = nwgui.App;
      this.win           = nwWindow;
      this.debugMode     = params.debugMode;
      this.logger        = new Logger(this);
      this.lng           = new Language(this);
      this.db            = new SkinyDb(this);
      this.activeAccount = ko.observable('');
      this.context       = ko.observable('');

      this.win.on('minimize', _minimizeRoutine);
      _loadKoComp();
      ko.applyBindings(this, $('#ko_main_menu')[0]);
    },

    /**
     * Gets the controller instance from the view and load it.
     *
     * @data {any} additional element that the controller might require.
     */
    boot: function(data) {

      // we load the actual controller definition from the ko_active_controller div
      var ctrl = $('#ko_active_controller').data('value'), binding = null;
      this.logger.trace('active controller instance name is ' + ctrl);

      // we try to call it's load method
      requirejs([ctrl], function(controller) {
        _this.logger.trace('cleaning bindings before for controller ' + ctrl);

        // controller exists we clear bindings
        binding = $('#ko_page_content')[0];
        ko.cleanNode(binding);

        _this.context(ctrl);

        controller.load(_this, data);
      });
    },

    /**
     * Redirect will get the value of the controller name
     * and load it.
     *
     * @param String ctlname the name of the controller
     * @param mixed data any data relevant for the invoked controller
     *
     * @return void
     */
    redirect: function(ctlname, data) {
      $('#ko_active_controller').data('value', ctlname);
      this.boot(data);
    }
  };

  return Facade;

});
