define(['knockout', 'jquery'], function(ko, $) {

  function ThirdParty(inst) {
    if (typeof inst === 'undefined') {
      this.name    = ko.observable();
      this.cid     = ko.observable();
    } else {
      this.name    = ko.observable(inst.name);
      this.cid     = ko.observable(inst.cid);
    }
  }

  ThirdParty.prototype.constructor = ThirdParty;

  ThirdParty.prototype.toDto = function() {
    return {
      name: this.name(),
      cid: this.cid()
    };
  };

  return ThirdParty;
});
