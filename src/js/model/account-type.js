define(
[
],
/**
 * AccountType describe a type of account
 * that should be associated to an Account Object.
 *
 * @exports model/AccountType
 */
function() {

  'user strict';

  /**
   * Default constructor
   *
   * @constructor
   */
  function AccountType(name) {
    /** @property cid {int} The id of the account type **/
    this.cid = null;

    /** @property name {string} The name of the account type **/
    this.name = name;
  }

  AccountType.prototype = {
    constructor: AccountType,

    /**
     * Returns a plain javascript object without bindings
     *
     * @returns {object} plain javascript object
     */
    toDto: function() {
      return {
        name: this.name
      };
    },

    /**
     * Returns a string representation of this object
     *
     * @returns {string} name of this object
     */
    toString: function() {
      return this.name;
    }
  };

  return AccountType;
});

