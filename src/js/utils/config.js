define([], function() {
  'use strict';

  var _this,
    fs = require('fs'),
    /**
     * put json configPath if exists to config object
     */
    _init = function() {
      if (fs.existsSync(_this.configPath)) {
        _this.configObj = JSON.parse(fs.readFileSync(_this.configPath));
      } else {
        _this.configObj = _configObj;
        _this.configIsNew = true;
      }
    },
    /**
     * get the window information and save position into
     * the config file.
     */
    _listenWinEvents = function() {
      var w = _this.facade.win;
      w.on('maximize', function() {
        console.log('window has been maximized...');
        _this.configObj.winMaximized = true;
      });
      w.on('unmaximize', function() {
        console.log('window has been restored');
        _this.configObj.winMaximized = false;
      });

    },

    /**
     * Represents a configuration object to be persisted
     * has a json string
     */
    _configObj = {
      activeAccount: '',
      winMaximized: false
    };

  function Config(in_path, facade) {
    _this = this;

    this.configPath  = in_path;
    this.configObj   = null;
    this.configIsNew = false;
    this.facade = facade;

    _init();
    _listenWinEvents();
  }

  Config.prototype = {
    constructor: Config,

    save: function() {
      // @todo update window position and save it to the configuration object...
      var confStream = JSON.stringify(this.configObj);
      fs.writeFileSync(this.configPath, confStream);

      return true;
    }
  };

  return Config;
});
