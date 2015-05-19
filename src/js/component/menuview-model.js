define(['knockout'], function(ko) {

  'use strict';

  var _this;

  function MenuViewModel(params) {
    _this = this;
    this.facade = params.facade;

    this.facade.logger.trace('in MenuViewModel component constructor');

    this.accountList = ko.observableArray(this.facade.db.account.items);
    this.btnNew      = ko.observable(this.facade.lng.get('menu/new'));
    this.btnDelete   = ko.observable(this.facade.lng.get('menu/delete'));
    this.btnQuit     = ko.observable(this.facade.lng.get('menu/quit'));

    this.facade.logger.trace('MenuViewModel:: constructor > observable setted!');

    this.facade.context.subscribe(function(newValue) {
      _this.facade.logger.trace('MenuViewModel::context changing to ' + newValue);
    });
  }

  MenuViewModel.prototype = {
    constructor: MenuViewModel,

    quitApp: function() {
      this.facade.logger.trace('MenuViewModel::quitApp > exiting application...');
      this.facade.app.quit();
    },

    addAccount: function() {
      this.facade.redirect('createAccount');
    },

    home: function() {
      this.facade.redirect('welcome');
    },

    deleteAccount: function() {
      this.facade.logger.trace('todo: delete account');
    }
  };

  return MenuViewModel;

});
