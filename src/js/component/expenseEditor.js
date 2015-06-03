define([
  'knockout'
],
/**
 * expense component Model layer.
 * This module contains the expense editor component model to handle the behavior
 * of the component tca-expense-editor.
 *
 * @exports component/ExpenseEditor
 */
function(ko) {

  'use strict';

  var _this,
  _tpl = require('fs').readFileSync('templates/component/expenseEditorView.html', 'utf-8')
   ;

  function ExpenseEditor(params) {
    _this = this;

    this.facade = params.facade;
    //
    this.facade.logger.trace('in ExpenseEditor component constructor');

    this.editedExpense = ko.observable();
  }

  ExpenseEditor.prototype = {
    constructor: ExpenseEditor,

    doSomething: function() {
      alert('something...');
    }
  };

  return {
    viewModel: ExpenseEditor,
    template: _tpl
  };

});
