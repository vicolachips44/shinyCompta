define([
  'jquery',
  'knockout',
  'account',
  'toastr'
],
/**
 * CreateAccount controller.
 *
 * @exports controller/createAccount
 */
function($, ko, Account, toastr) {

  'use strict';

  var _html = null,
    _this = null,

  /**
   * create bindings for the view
   */
  _initBindings = function() {
    _this.account      = new Account();
    _this.accountTypes = ko.observableArray([]);
    _this.welcomeMsg   = ko.observable('');
  };

  /**
   * CreateAccount constructor
   *
   * @constructor
   */
  function CreateAccount(facade) {
    _this = this;
    this.facade = facade;

    _initBindings();
  }

  CreateAccount.prototype = {
    constructor: CreateAccount,

    /**
     * Load the controller and update bindings.
     *
     */
    load: function(firstrun) {
      if (_html === null) {
        _html = require('fs').readFileSync('templates/createAccount.html', 'utf8');
      }

      this.facade.logger.trace('in createAccount controller load function');
      $('#ko_page_content').html(_html);

      _initBindings();

      this.accountTypes(this.facade.db.accountType.items);

      if (firstrun) {
        this.welcomeMsg(this.facade.lng.get('common/hello'));
      } else {
        this.welcomeMsg(this.facade.lng.get('account/newAccount'));
      }

      var binding = $('#ko_page_content')[0];
      ko.applyBindings(this, binding);

      this.facade.logger.trace('binding done for createAccount controller');
      $('#createAccount_account_name').focus();
    },

    /**
     * User has clicked on save button
     */
    onBtnSaveClick: function() {
      if (this.account.getValidator().validate()) {
        var cid = this.facade.db.account.insert(this.account.toDto()),
          msgCreated;

        this.account.cid(cid);

        // refresh the account list
        this.facade.menu.accountList(this.facade.db.account.items);

        // set the active account to the newly created account
        this.facade.menu.activeAccount(ko.toJS(this.account));

        msgCreated = this.facade.lng.format('account/newAccountCreated', [this.account.name()]);
        toastr.info(msgCreated);

        this.facade.redirect('welcome');
      }
    },

    /**
     * User has clicked on cancel button
     */
    onBtnCancelClick: function() {
      this.facade.redirect('welcome');
    }
  };

  return CreateAccount;
});
