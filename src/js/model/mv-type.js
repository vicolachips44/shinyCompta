define(['knockout'], function(ko) {
  function MvType(data) {
    this.name = ko.observable(data.name);
    this.value = ko.observable(data.value);
  }

  MvType.prototype = {
    constructo: MvType
  };

  return MvType;
});
