define([
  'underscore',
  'locallydbcol'
],

 /**
  * Modules that contains the LocallyDb instance
  *
  * @exports db/DB
  */
function(_, Collection) {
  'use strict';

  var fs = require('fs'),
    path = require('path');

  /**
   * DB - Default constructor
   *
   * @param  {string} path The folder path to create the database into
   */
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

  /**
   * Members instance
   */
  DB.prototype =  {
    constructor: DB,

    /**
     * collection - The collection is the top level object
     *
     * @param  {string}  name     The name of the collection
     * @param  {boolean} autosave If it should save on every insert, update (true by default)
     */
    collection: function(name, autosave) {
      autosave = autosave || true;
      return new Collection(name, this, autosave);
    },

    /**
     * getCollectionNames - returns the collections name from the path of this db.
     *
     * @return {array} an array of names
     */
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
