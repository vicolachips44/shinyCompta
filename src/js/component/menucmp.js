define([
  'knockout'
],
/**
 * menu component Model layer.
 * This module contains the menu component model to handle the behavior
 * of the component tca-menu.
 *
 * @exports component/Menucmp
 */
function(ko) {

  'use strict';

  var _this,
  _tpl = require('fs').readFileSync('templates/component/menuView.html', 'utf-8')
   ;


  /**
   * Menucmp constructor
   *
   * @constructor
   *
   * @param params {object} a parameter object passed from the view.
   */
  function Menucmp(params) {
    _this = this;
    /** @property facade {Facade} a pointer to the facade instance */
    this.facade = params.facade;

    this.facade.logger.trace('in MenuViewModel component constructor');

    /** @property activeAccount {ObservableArray} The list of account */
    this.accountList = ko.observableArray(this.facade.db.account.items);
    console.log('configuration active account is ' + _this.facade.config.configObj.activeAccount);
    console.log('retrieving object from name...');

    var rs = _this.facade.db.account.where({name: _this.facade.config.configObj.activeAccount});

    /** @property activeAccount {Observable} The knockout binding for the active selected account */
    this.activeAccount = rs.items.length === 1 ? ko.observable(rs.items[0]) : ko.observable();

    // expose this instance as menu property of facade
    this.facade.menu   = this;

    this.btnNew        = this.facade.lng.get('menu/new');
    this.btnDelete     = this.facade.lng.get('menu/delete');
    this.btnQuit       = this.facade.lng.get('menu/quit');

    this.facade.logger.trace('MenuViewModel:: constructor > observable setted!');

    /**
     * Subscribtion to the context value changing in facade object
     * to updat the UI.
     */
    this.facade.context.subscribe(function(newValue) {
      _this.facade.logger.trace('MenuViewModel::context changing to ' + newValue);

      if (newValue === 'welcome') {
        $('#menuview_btnAddAccount').show();
        $('#menuview_btnDeleteAccount').show();
      } else {
        $('#menuview_btnAddAccount').hide();
        $('#menuview_btnDeleteAccount').hide();
      }
    });

    /**
     * update the configuration active account when ever it changes.
     */
    this.activeAccount.subscribe(function(account) {
      _this.facade.logger.trace('MenuCmp::activeAccount changing to ' + account.name);
      _this.facade.config.configObj.activeAccount = account.name;
    });
  }

  Menucmp.prototype = {
    constructor: Menucmp,

    /**
     * Calls the quit method of the Facade Application instance.
     */
    quitApp: function() {
      this.facade.logger.trace('MenuViewModel::quitApp > exiting application...');
      this.facade.doQuit();
    },

    /**
     * Change the active controller to create a new account
     */
    addAccount: function() {
      this.facade.redirect('createAccount');
    },

    /**
     * Change the active controller to the welcome.
     */
    home: function() {
      this.facade.redirect('welcome');
    },

    /**
     * Delete the active account
     *
     * @todo: delete the active account
     */
    deleteAccount: function() {
      this.facade.logger.trace('todo: delete account');
    }
  };

  return {
    viewModel: Menucmp,
    template: _tpl
  };

});
