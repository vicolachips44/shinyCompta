define([
  'knockout'
],
/**
 * Represents an object to associate a third party
 * to an expense object.
 *
 * @exports model/ThirdParty
 */
function(ko) {

  'use strict';

  /**
   * ThirdParty constructor
   *
   * @param {object} inst Object name and cid
   *
   * @constructor
   */
  function ThirdParty(inst) {
    if (typeof inst === 'undefined') {
      /** @property name {Observable-string} The name of third party **/
      this.name    = ko.observable();

      /** @property name {Observable-string} The id of the third party **/
      this.cid     = ko.observable();
    } else {
      this.name    = ko.observable(inst.name);
      this.cid     = ko.observable(inst.cid);
    }
  }

  ThirdParty.prototype.constructor = ThirdParty;

  /**
   * Returns the properties of this object à plain javascript object
   * without the bindings
   *
   * @returns {object} plain javascript object
   */
  ThirdParty.prototype.toDto = function() {
    return {
      name: this.name(),
      cid: this.cid()
    };
  };

  return ThirdParty;
});
