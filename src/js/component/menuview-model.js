define([
  'knockout'
],
/**
 * MenuView Model layer.
 * This module contains the MenuViewModel to handle the behavior
 * of the component tca-menu.
 *
 * @exports component/MenuViewModel
 */
function(ko) {

  'use strict';

  var _this;

  /**
   * MenuViewModel constructor
   *
   * @constructor
   *
   * @param params {object} a parameter object passed from the view.
   */
  function MenuViewModel(params) {
    _this = this;
    this.facade = params.facade;

    this.facade.logger.trace('in MenuViewModel component constructor');

    this.accountList = ko.observableArray(this.facade.db.account.items);
    this.btnNew      = this.facade.lng.get('menu/new');
    this.btnDelete   = this.facade.lng.get('menu/delete');
    this.btnQuit     = this.facade.lng.get('menu/quit');

    this.facade.logger.trace('MenuViewModel:: constructor > observable setted!');

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
  }

  MenuViewModel.prototype = {
    constructor: MenuViewModel,

    /**
     * Calls the quit method of the Facade Application instance.
     */
    quitApp: function() {
      this.facade.logger.trace('MenuViewModel::quitApp > exiting application...');
      this.facade.app.quit();
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

  return MenuViewModel;

});
