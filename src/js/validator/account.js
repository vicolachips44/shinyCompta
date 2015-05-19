define(['knockout'], function(ko) {

  'use strict';

  function AccountValidator(account) {
    this.account = account;
    this.nameErr      = ko.observable('');
    this.amountErr    = ko.observable('');
    this.accTypeIdErr = ko.observable('');
  }

  AccountValidator.prototype = {
    constructor: AccountValidator,

    validate: function() {
      this.nameErr('');
      this.amountErr('');
      this.accTypeIdErr('');

      if (this.account.name().length === 0) {
        this.nameErr('Le nom du compte doit être précisé');
        return false;
      }
      if (typeof this.account.amount() === 'undefined' || this.account.amount() === 0 || this.account.amount() < 1) {
        this.amountErr('Le solde du compte doit être précisé');
        return false;
      }
      if ($.isNumeric(this.account.amount()) === false) {
        this.amountErr('Le solde du compte doit être un nombre positif');
        return false;
      }
      if (typeof this.account.accTypeId() === 'undefined') {
        this.accTypeIdErr('Le type de compte doit être précisé');
        return false;
      }
      return true;
    }
  };

  return AccountValidator;
});
