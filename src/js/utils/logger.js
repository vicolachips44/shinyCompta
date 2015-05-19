define([''], function() {
  var _logger = require('log4js');

  function Logger(facade) {
    _logger.configure('log4js-conf.json', {});
    this.logger = _logger.getLogger('skiny');

    if (!facade.debugMode) {
      this.logger.setLevel('ERROR');
    }
  }

  Logger.prototype = {
    constructor: Logger,

    trace: function(msg) {
      this.logger.trace(msg);
    },

    debug: function(msg) {
      this.logger.debug(msg);
    },

    warn: function(msg) {
      this.logger.warn(msg);
    }
  };

  return Logger;
});
