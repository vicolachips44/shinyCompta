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

    this.facade.logger.trace('in Menucmp component constructor');

    /** @property activeAccount {ObservableArray} The list of account */
    this.accountList = ko.observableArray(this.facade.db.account.items);

    var rs = _this.facade.db.account.where({name: _this.facade.config.configObj.activeAccount});

    /** @property activeAccount {Observable} The knockout binding for the active selected account */
    this.activeAccount = rs.items.length === 1 ? ko.observable(rs.items[0]) : ko.observable();

    // expose this instance as menu property of facade
    this.facade.menu   = this;

    this.btnNew        = this.facade.lng.get('menu/new');
    this.btnDelete     = this.facade.lng.get('menu/delete');
    this.btnQuit       = this.facade.lng.get('menu/quit');

    this.facade.logger.trace('Menucmp:: constructor > observable setted!');

    /**
     * Subscribtion to the context value changing in facade object
     * to updat the UI.
     */
    this.facade.context.subscribe(function(newValue) {
      _this.facade.logger.trace('Menucmp::context changing to ' + newValue);

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
      if (account !== null && typeof account !== 'undefined') {
        _this.facade.logger.trace('MenuCmp::activeAccount changing to ' + account.name);
        _this.facade.config.configObj.activeAccount = account.name;
      } else {
        _this.facade.config.configObj.activeAccount = '';
      }
    });
  }

  Menucmp.prototype = {
    constructor: Menucmp,

    /**
     * Calls the quit method of the Facade Application instance.
     */
    quitApp: function() {
      this.facade.logger.trace('Menucmp::quitApp > exiting application...');
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
      var account = this.activeAccount();
      if (typeof account !== 'undefined' && account.cid > -1) {
        // @todo: ask for deletion if account has some expenses...
        var cid = account.cid;
        this.facade.logger.trace('account to be removed : ' + account.name);
        this.activeAccount(null);
        this.facade.db.account.remove(cid);
        this.facade.logger.trace('account with cid ' + cid + ' removed');
        this.accountList(this.facade.db.account.items);
        if (this.accountList.length === 0) {
          this.facade.win.reload();
        }
      } else {
        this.facade.logger.trace('activeAccount observable is empty');
      }
    }
  };

  return {
    viewModel: Menucmp,
    template: _tpl
  };

});
