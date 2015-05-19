define(['underscore', 'locallydbcol'], function(_, Collection) {
  'use strict';

  var fs = require('fs'),
    path = require('path');

  function DB(path) {
    var stats;
    this.path = path;
    if (fs.existsSync(path)) {
      stats = fs.lstatSync(path);
      if (!stats.isDirectory()) {
        throw 'Path should be a folder';
      }
    } else {
      fs.mkdirSync(path);
    }
  }

  DB.prototype =  {
    constructor: DB,

    collection: function(name, autosave) {
      autosave = autosave || true;
      return new Collection(name, this, autosave);
    },

    getCollectionNames: function() {
      var file, i, list, res, llen, _path;

      list = fs.readdirSync(this.path);
      res = [];
      llen = list.length;
      for (i = 0; i <= llen; i = i + 1) {
        file = list[i];
        _path = path.join(this.path, file);
        try {
          JSON.parse(fs.readFileSync(_path, 'utf8'));
          res.push(file);
        } catch (_error) {}
      }
      return res;
    }
  };

  return DB;
});
