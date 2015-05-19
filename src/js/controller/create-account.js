define(['knockout'], function(ko) {
  var _html = null,
  _this;

  return {
    load: function(facade) {
      this.facade = facade;
      _this = this;

      if (_html === null) {
        _html = require('fs').readFileSync('templates/createAccount.html', 'utf8');
      }

      facade.logger.trace('in createAccount controller load function');
      $('#ko_page_content').html(_html);

      var binding = $('#ko_page_content')[0];
      ko.applyBindings(this, binding);

      this.facade.logger.trace('binding done for createAccount controller');
    }
  };
});
