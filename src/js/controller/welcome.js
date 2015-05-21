define([
  'jquery',
  'knockout'
],
/**
 * Welcome controller
 *
 * @exports controller/welcome
 *
 **/
function($, ko, html) {

  'use strict';

  var _html = null,
  _this = null;

  /**
   * Default constructor for Welcome
   *
   * @constructor
   */
  function Welcome(facade) {
    _this = this;

    /** @property {object} facade a pointer to the facade instance **/
    this.facade = facade;
  }

  Welcome.prototype = {
    constructor: Welcome,

    /**
     * Loads the controller and bind values.
     */
    load: function() {
      if (this.facade.db.account.items.length === 0) {
        // there is no account created
        this.facade.redirect('createAccount', true);
        return;
      }

      if (_html === null) {
        _html = require('fs').readFileSync('templates/welcome.html', 'utf8');
      }

      this.greeting = this.facade.lng.get('common/hello');

      this.facade.logger.trace('in welcome controller load function');
      $('#ko_page_content').html(_html);

      var binding = $('#ko_page_content')[0];
      ko.applyBindings(this, binding);

      this.facade.logger.trace('binding done for welcome controller');
    }
  };

  return Welcome;
});
