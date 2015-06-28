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
  _tpl = require('fs').readFileSync('templates/component/expenseListView.html', 'utf-8')
  ;

  function ExpenseList(params) {
    _this = this;
    this.facade = params.facade;
    this.facade.logger.trace('in expenseList constructor');
    this.selectedExpense = ko.observable();
    this.expenseItems = ko.observableArray([{
      cid: 1,
      date: '26/03/2015',
      mvTypeValue: 'Débit',
      amount: '800,32 €',
      thirdparty: 'Crédit Agricole',
      description: 'Frais annuel de restauration',
      category: 'Frais bancaire',
      balance: '1390 €'
    }]);
  }

  ExpenseList.prototype = {
    constructor: ExpenseList,

    onRowClick: function(item, event) {
      // item is an expense (ex item.cid)
      _this.facade.logger.trace('setting expense editor current selected item...' + item.cid);
      // target is the clicked element (here TD)
      $(event.target).closest('tr').css('background-color', 'lightgray');
    }
  };

  return {
    viewModel: ExpenseList,
    template: _tpl
  };
});
