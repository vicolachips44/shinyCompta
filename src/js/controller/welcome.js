define(['jquery', 'knockout'], function($, ko, html) {

  var _html = null,
  _this;

  return {
    load: function(facade) {
      this.facade = facade;
      _this = this;

      if (_html === null) {
        _html = require('fs').readFileSync('templates/welcome.html', 'utf8');
      }

      this.greeting = facade.lng.get('common/hello');

      facade.logger.trace('in welcome controller load function');
      $('#ko_page_content').html(_html);

      var binding = $('#ko_page_content')[0];
      ko.applyBindings(this, binding);

      this.facade.logger.trace('binding done for welcome controller');
    }
  };

});
