define([
  'knockout',
  'expenseValidator'
],
/**
 * This is the Expense object. An Expense is the child
 * of an Account object.
 *
 * @exports modele/Expense
 */
function(ko) {

  'use strict';

  var _validator = null;

  /**
   * @constructor
   *
   * @param {object} expense an expense object for init.
   */
  function Expense(expense) {
    /** @property accId {Observable-int} The Account parent id **/
    this.accId = ko.observable(expense.accId);

    /** @property date {Observable-string} Date of the expense **/
    this.date = ko.observable(expense.date);

    /** @property mvTypeValue {Observable-int} The Mouvment type value (1 or -1) **/
    this.mvTypeValue = ko.observable(expense.mvTypeValue);

    /** @property thirdPartyId {Observable-string} Third party id **/
    this.thirdPartyId = ko.observable(expense.thirdPartyId);

    /** @property description {Observable-string} A description for this expense **/
    this.description = ko.observable(expense.description);

    /** @property amount {Observable-float} The amount value **/
    this.amount = ko.observable(expense.amount);

    /** @property balance {Observable-float} Technical field to calculate current amount **/
    this.balance = ko.observable(expense.balance);

    /** @property cid {Observable-int} The id of this instance **/
    this.cid = ko.observable(expense.cid);
  }

  Expense.prototype.constructor = Expense;

  /**
   * returns a simple object made by properties of this object
   * without the knockout binding stuff.
   *
   * @returns {object} simple DTO object.
   */
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

  /**
   * returns the validator instance for this object
   *
   * @returns {AccountValidator} the account validator
   */
  Expense.prototype.getValidator = function() {
    if (_validator === null) {
      _validator = new AccountValidator(this);
    }
    return _validator;
  };

  return Expense;
});
