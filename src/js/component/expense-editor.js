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
  _newToken,
  _tpl = require('fs').readFileSync('templates/component/expenseEditorView.html', 'utf-8'),
  _initEditor = function() {

    _this.dateval(null);
    _this.mvType({
      label: _this.facade.lng.get('account/mvDebit'), value: -1
    });

    _this.amount(null);
    _this.thirdparty({name: ''});
    _this.description(null);
    _this.category({name: ''});
  }
  ;

  function ExpenseEditor(params) {
    _this = this;
    this.facade = params.facade;
    _newToken = this.facade.lng.get('menu/new') + '...';

    this.facade.logger.trace('in ExpenseEditor component constructor');

    this.editedExpense = ko.observable();

    this.btnNewLabel      = this.facade.lng.get('menu/new');
    this.btnSaveLabel     = this.facade.lng.get('menu/save');
    this.dateLabel        = this.facade.lng.get('common/date');
    this.mvTypeLabel      = this.facade.lng.get('account/mvType');
    this.amountLabel      = this.facade.lng.get('account/amount');
    this.thirdpartyLabel  = this.facade.lng.get('account/thirdparty');
    this.descriptionLabel = this.facade.lng.get('common/description');
    this.categoryLabel    = this.facade.lng.get('account/category');

    this.dateval      = ko.observable();
    this.mvType       = ko.observable({label: this.facade.lng.get('account/mvDebit'), value: -1});
    this.amount       = ko.observable();
    this.thirdparty   = ko.observable();
    this.description  = ko.observable();
    this.category     = ko.observable();

    this.thirdpartyList = ko.observableArray(
        [{name: ''}, {name: _newToken}].concat(
          this.facade.db.thirdparty.items
        )
    );

    this.categoryList = ko.observableArray(
        [{name: ''}, {name: _newToken}].concat(
          this.facade.db.category.items
        )
    );

    this.mvTypeList = ko.observableArray([{
      label: this.facade.lng.get('account/mvDebit'), value: -1
    },{
      label: this.facade.lng.get('account/mvCredit'), value: 1
    }]);

    /**
     * Subscribtion to the context value changing in facade object
     * to update the UI.
     */
    this.facade.context.subscribe(function(newValue) {
      if (newValue === 'welcome') {
        _this.facade.logger.trace('showing the editor panel...');
        $('div.tca-expense-editor').show();
      } else {
        _this.facade.logger.trace('hiding the editor panel...');
        $('div.tca-expense-editor').hide();
      }
    });

    /**
     * Active account change subscription.
     */
    this.facade.menu.activeAccount.subscribe(function() {
      _initEditor();
    });

    _initEditor();
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
