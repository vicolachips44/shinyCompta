define([
 'knockout'
],
/**
 * List of expense for the current selected account
 *
 * @exports ExpenseList
 */
function(ko) {

  'use strict';

  var _this,
  _tpl = require('fs').readFileSync('templates/component/expenseListView.html', 'utf-8');

  function ExpenseList() {
    _this = this;
    this.selectedExpense = ko.observable();
    this.expenseItems = ko.observableArray([]);
  }

  ExpenseList.prototype = {
    constructor: ExpenseList
  };

  return {
    viewModel: ExpenseList,
    template: _tpl
  };
});
