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

    this.facade.logger.trace('in ExpenseEditor component constructor');

    this.editedExpense = ko.observable();

    this.btnNewLabel    = this.facade.lng.get('menu/new');
    this.btnSaveLabel   = this.facade.lng.get('menu/save');
    this.btnDeleteLabel = this.facade.lng.get('menu/delete');

    $('#exeBtnDelete').attr('disabled', 'disabled');
    /**
     * Subscribtion to the context value changing in facade object
     * to update the UI.
     */
    this.facade.context.subscribe(function(newValue) {
      if (newValue === 'welcome') {
        $('#tca_expense_editor').show();
      } else {
        $('#tca_expense_editor').hide();
      }
    });
  }

  ExpenseEditor.prototype = {
    constructor: ExpenseEditor,

    btnNewClick: function() {
      _this.facade.logger.trace('btn new on expense editor was clicked...');
    },

    btnSaveClick: function() {
      _this.facade.logger.trace('btn save on expense editor was clicked...');
    },

    btnDeleteClick: function() {
      _this.facade.logger.trace('btn delete on expense editor was clicked...');
    }
  };

  return {
    viewModel: ExpenseEditor,
    template: _tpl
  };

});
