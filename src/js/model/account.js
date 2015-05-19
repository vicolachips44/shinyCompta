define(['knockout', 'accountValidator', 'jquery'], function(ko, AccountValidator, $) {

  'use strict';

  var _validator = null;

  function Account() {
    this.name         = ko.observable('');
    this.amount       = ko.observable(0);
    this.accTypeId    = ko.observable();
  }

  Account.prototype.constructor = Account;

  Account.prototype.toDto = function() {
    return {
      accTypeId: this.accTypeId(),
      name: this.name(),
      amount: parseFloat(this.amount()).toFixed(2)
    };
  };

  Account.prototype.getValidator = function() {
    if (_validator === null) {
      _validator = new AccountValidator(this);
    }
    return _validator;
  };

  return Account;
});
