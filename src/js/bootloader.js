
(function() {
  'use strict';

  window.skinyDebugMode = true;

  var script  = document.createElement('script');
  script.type = 'text/javascript';

  script.setAttribute('data-main', 'js/require-config.js');
  script.src = 'vendor/requirejs/require.js';

  document.body.appendChild(script);

}).call(this);

