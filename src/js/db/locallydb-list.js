define(['underscore'], function(_) {
  'use strict';

  function List(items) {
    this.items = items || [];
  }

  List.prototype = {
    toArray: function() {
      return this.items;
    },

    length: function() {
      return this.items.length;
    },

    push: function(element) {
      return this.items.push(element);
    },

    pop: function(element) {
      return this.items.pop(element);
    },

    shift: function(element) {
      this.items.shift(element);
    },

    unshift: function(element) {
      this.items.unshift(element);
    },

    remove: function(from, to) {
      var rest;
      rest = this.items.slice((to || from) + 1 || this.items.length);
      this.items.length = from < 0 ? this.items.length + from : from;
      return this.items.push.apply(this.items, rest);
    },

    where: function(selection) {
      if (typeof selection === 'string') {
        /*jshint evil: true */
        selection = selection.replace(/@/g, 'element.');
        return new List(_.filter(this.items, function(element) {
          return eval(selection);
        }));
      } else {
        return new List(_.where(this.items, selection));
      }
    },

    sort: function(method) {
      /*jshint evil: true */
      method = method.replace(/@/g, 'element.');
      return new List(_.sortBy(this.items, function(element) {
        return eval(method);
      }));
    },

    group: function(method) {
      /*jshint evil: true */
      method = method.replace(/@/g, 'element.');
      return _.groupBy(this.items, function(element) {
        return eval(method);
      });
    }
  };

  return List;
});
