define(['knockout'], function() {

  'use strict';

  function ExpenseValidator(expense) {
    this.expense = expense;
    this.dateErr = ko.observable('');
    this.thirdPartyErr = ko.observable('');
    this.descriptionErr = ko.observable('');
    this.amountErr = ko.observable('');
  }

  ExpenseValidator.prototype = {
    constructor: ExpenseValidator,

    validate: function() {
      this.dateErr('');
      this.thirdPartyErr('');
      this.descriptionErr('');
      this.amountErr('');

      return true;
    }
  };

});
