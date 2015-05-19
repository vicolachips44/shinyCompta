define(['knockout', 'expenseValidator'], function(ko) {

  'use strict';

  var _validator = null;

  function Expense(expense) {
    this.accId = ko.observable(expense.accId);
    this.date = ko.observable(expense.date);
    this.mvTypeValue = ko.observable(expense.mvTypeValue);
    this.thirdPartyId = ko.observable(expense.thirdPartyId);
    this.description = ko.observable(expense.description);
    this.amount = ko.observable(expense.amount);
    this.balance = ko.observable(expense.balance);
    this.cid = ko.observable(expense.cid);
  }

  Expense.prototype.constructor = Expense;

  Expense.prototype.toDto = function() {
    return {
      accId: this.accId(),
      date: this.date(),
      mvTypeValue: this.mvTypeValue(),
      thirdPartyId: this.thirdPartyId(),
      description: this.description(),
      amount: parseFloat(this.amount()).toFixed(2),
      balance: parseFloat(this.balance()).toFixed(2)
    };
  };

  Expense.prototype.getValidator = function() {
    if (_validator === null) {
      _validator = new AccountValidator(this);
    }
    return _validator;
  };

  return Expense;
});
