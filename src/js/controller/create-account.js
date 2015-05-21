define([
  'knockout',
  'account'
],
/**
 * CreateAccount controller.
 *
 * @exports controller/createAccount
 */
function(ko, Account) {

  'use strict';

  var _html = null,
  _this,
  /**
   * create bindings for the view
   */
  _initBindings = function() {
    _this.account      = new Account();
    _this.accountTypes = ko.observableArray([]);
    _this.welcomeMsg   = ko.observable('');
  };

  return {
    /**
     * Loads the controller and applies the binding on the view.
     */
    load: function(facade, firstrun) {
      this.facade   = facade;
      _this         = this;

      if (_html === null) {
        _html = require('fs').readFileSync('templates/createAccount.html', 'utf8');
      }

      facade.logger.trace('in createAccount controller load function');
      $('#ko_page_content').html(_html);

      _initBindings();

      this.accountTypes(this.facade.db.accountType.items);

      if (firstrun) {
        this.welcomeMsg('Bienvenue dans shinyCompta. Pour commencer merci de créer un compte');
      } else {
        this.welcomeMsg('Nouveau compte');
      }

      var binding = $('#ko_page_content')[0];
      ko.applyBindings(this, binding);

      this.facade.logger.trace('binding done for createAccount controller');
    },

    /**
     * User has click on save button
     */
    onBtnSaveClick: function() {

      if (this.account.getValidator().validate()) {
        this.facade.db.account.insert(this.account.toDto());
        toastr.info('Le compte ' + this.account.name() + ' à été créé!');
        this.facade.redirect('welcome');
      }
    },

    onBtnCancelClick: function() {
      this.facade.redirect('welcome');
    }
  };
});
