define(['underscore', 'locallydblist'], function(_, List) {
  'use strict';

  var path = require('path'),
    fs = require('fs');

  Array.prototype.remove = function(from, to) {
    var rest;
    rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  function Coll(inName, inDb, inAutosave) {
    List.call(this);
    this.dbname = inName;
    this.db = inDb;
    this.autosave = inAutosave || true;
    this.items = [];
    this.isNew = false;

    this.header = {
      $created: (new Date()).toJSON(),
      $updated: (new Date()).toJSON(),
      lcid: -1
    };
    this.loadFromDisk();
  }

  Coll.prototype = new List();

  Coll.prototype.constructor = Coll;

  Coll.prototype.loadFromDisk = function() {
    var data;
    this._cpath = path.join(this.db.path, this.dbname);

    if (fs.existsSync(this._cpath)) {
      data = JSON.parse(fs.readFileSync(this._cpath, 'utf8'));
      this.items = data.items;
      this.header = data.header;
    } else {
      fs.writeFileSync(
        this._cpath,
        JSON.stringify({
          header: this.header,
          items: this.items
        })
      );
      this.isNew = true;
    }
  };

  Coll.prototype.save = function() {
    this.header.$updated = (new Date()).toJSON();
    return fs.writeFileSync(this._cpath, JSON.stringify({
      header: this.header,
      items: this.items
    }));
  };

  Coll.prototype.insert = function(element, pos) {
    var date, elem, result, _i, _len;
    date = (new Date()).toJSON();

    if (element instanceof Array) {
      result = [];
      for (_i = 0, _len = element.length; _i < _len; _i++) {
        elem = element[_i];
        this.header.lcid++;
        elem.cid = this.header.lcid;
        elem.$created = date;
        elem.$updated = date;
        this.items.push(elem);
        result.push(this.header.lcid);
      }
    } else {
      this.header.lcid++;
      element.cid = this.header.lcid;
      element.$created = date;
      element.$updated = date;
      if (pos === 'bottom') {
        this.items.unshift(element);
      } else {
        this.items.push(element);
      }
      result = this.header.lcid;
    }
    if (this.autosave) {
      this.save();
    }
    return result;
  };

  Coll.prototype.upsert = function(element, key, value) {
    var check;
    check = this.where('(@' + key + ' ==  \'' + value + '\')');
    if (check.length > 0) {
      this.update(check[0].cid, element);
      return true;
    } else {
      this.insert(element);
      return this.header.lcid;
    }
  };

  Coll.prototype.get = function(cid) {
    return _.findWhere(this.items, {
      cid: cid
    });
  };

  Coll.prototype.update = function(cid, obj) {
    var element, i, key, _i, _len, _ref;
    _ref = this.items;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      element = _ref[i];
      if (element.cid === cid) {
        obj.cid = this.items[i].cid;
        obj.$created = this.items[i].$created;
        obj.$updated = (new Date()).toJSON();
        for (key in obj) {
          this.items[i][key] = obj[key];
        }
        if (this.autosave) {
          this.save();
        }
        return true;
      }
    }
    return false;
  };

  Coll.prototype.replace = function(cid, obj) {
    var element, i, key, _i, _len, _ref;
    _ref = this.items;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      element = _ref[i];
      if (element.cid === cid) {
        obj.cid = this.items[i].cid;
        obj.$created = this.items[i].$created;
        for (key in this.items[i]) {
          delete this.items[i][key];
        }
        obj.$updated = (new Date()).toJSON();
        for (key in obj) {
          this.items[i][key] = obj[key];
        }
        if (this.autosave) {
          this.save();
        }
        return true;
      }
    }
    return false;
  };

  Coll.prototype.remove = function(cid) {
    var i, ref = this.items, len = ref.length;

    for (i = 0; i < len; i++) {
      if (ref[i].cid === cid) {
        this.items.remove(i);
        if (this.autosave) {
          this.save();
        }
        return true;
      }
    }
    return false;
  };

  Coll.prototype.deleteProperty = function(cid, property) {
    var element, i, properties, _i, _j, _len, _len1, _ref;
    _ref = this.items;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      element = _ref[i];
      if (element.cid === cid) {
        if (property instanceof Array) {
          properties = property;
          for (_j = 0, _len1 = properties.length; _j < _len1; _j++) {
            property = properties[_j];
            if (element[property] !== null) {
              delete this.items[i][property];
            }
          }
        } else {
          if (element[property] !== null) {
            delete this.items[i][property];
          }
        }
        if (this.autosave) {
          this.save();
        }
        return true;
      }
    }
    return false;
  };

  return Coll;

});
