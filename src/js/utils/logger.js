define([''],

 /**
  * Logger object. Configuration is supposed to be readed from
  * a file log4js-conf.json.
  *
  * @exports utils/Logger
  */
function() {

  'use strict';

  var _logger = require('log4js');

  /**
   * Logger - Default constructor
   *
   * @param  {object} facade The facade instance
   * @return {object}        The logger instance
   */
  function Logger(facade) {
    _logger.configure('log4js-conf.json', {});
    this.logger = _logger.getLogger('skiny');

    if (!facade.debugMode) {
      this.logger.setLevel('ERROR');
    }
  }

  /**
   * The logger instance members.
   */
  Logger.prototype = {
    constructor: Logger,

    /**
     * trace - invokes the trace method of the logger
     *
     * @param  {string} msg the message to trace
     */
    trace: function(msg) {
      console.log(msg);
      this.logger.trace(msg);
    },

    /**
     * debug - invokes the debug method of the logger
     *
     * @param  {string} msg the message
     */
    debug: function(msg) {
      this.logger.debug(msg);
    },

    /**
     * warn - warn message
     *
     * @param  {string} msg the warning message
     */
    warn: function(msg) {
      this.logger.warn(msg);
    }
  };

  return Logger;
});
