define([
  'knockout'
],
/**
 * Type of expense should be Debit or Credit
 *
 * @exports model/MvType
 */
function(ko) {

  'use strict';

  /**
   * Default constructor
   *
   * @constructor
   */
  function MvType(data) {
    /** @property name {Observable-string} The Mouvment type name **/
    this.name = ko.observable(data.name);

    /** @property value {Observable-int} The value (1 or -1) **/
    this.value = ko.observable(data.value);
  }

  MvType.prototype = {
    constructor: MvType,

    /**
     * Returns a string representation of this object
     *
     * @returns {string} name of this object
     */
    toString: function() {
      return this.name;
    }
  };

  return MvType;
});
