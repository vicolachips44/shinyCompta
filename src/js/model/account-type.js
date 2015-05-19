define([], function() {

  'user strict';

  function AccountType(name) {
    this.cid = null;
    this.name = name;
  }

  AccountType.prototype = {
    constructor: AccountType,
    toDto: function() {
      return {
        name: this.name
      };
    },

    toString: function() {
      return this.name;
    }
  };

  return AccountType;
});

