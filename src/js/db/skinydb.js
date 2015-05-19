define(['locallydb', 'accountType'], function(LocallyDb, AccountType) {

  'use strict';

  var
    _dbinst,
    _this = null,

    _initAccountType = function(accountType) {
      if (accountType.items.length > 0) {
        _this.facade.logger.trace('account types already exists exiting method...');
        return;
      }

      var ccTypes = [
        new AccountType('compte chèques').toDto(),
        new AccountType('compte courant').toDto(),
        new AccountType('compte d\'épargne').toDto()
      ];

      accountType.insert(ccTypes);
      _this.facade.logger.trace('account types have been created for the new database');
    };

  function SkinyDb(facade) {
    var path  = require('path'),
      dbloc = path.join(facade.app.dataPath, 'database');

    facade.logger.trace('creating or openning database at location: ' + dbloc);
    _dbinst          = new LocallyDb(dbloc);
    _this            = this;
    this.facade      = facade;
    this.account     = _dbinst.collection('accounts');
    this.categorie   = _dbinst.collection('categories');
    this.thirdparty  = _dbinst.collection('thirdParties');
    this.expense     = _dbinst.collection('expenses');
    this.accountType = _dbinst.collection('accountTypes');

    facade.logger.trace('database has been created');

    _initAccountType(this.accountType);
  }

  SkinyDb.prototype = {
    constructor: SkinyDb
  };

  return SkinyDb;
});
