define([
  'knockout',
  'accountValidator',
  'jquery'
],
/**
 * This is the Account object.
 * Account object can have one ore more Expense object
 *
 * @exports Account
 */
function(ko, AccountValidator, $) {

  'use strict';

  var _validator = null;

  /**
   * Account constructor
   *
   * @constructor
   */
  function Account() {
    this.name         = ko.observable('');
    this.amount       = ko.observable(0);
    this.accTypeId    = ko.observable();
  }

  Account.prototype.constructor = Account;

  /**
   * Return a simple object made by properties of this
   * object with out the binding stuff made by knockout.
   *
   * @returns {object} simple DTO object
   */
  Account.prototype.toDto = function() {
    return {
      accTypeId: this.accTypeId(),
      name: this.name(),
      amount: parseFloat(this.amount()).toFixed(2)
    };
  };

  /**
   * Exposes the Validator instance of this object.
   *
   * @returns {object} The validator instance
   */
  Account.prototype.getValidator = function() {
    if (_validator === null) {
      _validator = new AccountValidator(this);
    }
    return _validator;
  };

  return Account;
});
