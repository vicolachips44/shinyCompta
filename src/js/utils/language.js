define([
  'globalize',
  'cldr',
  'globalize/currency',
  'globalize/date',
  'globalize/number',
  'globalize/message'
], function(
  Globalize,
  cldr,
  gCurrency,
  gDate,
  gNumber,
  gMessage
  ) {
  var _this,
  fs = require('fs'),

  _platformLanguage = function() {
    if (window.navigator.language === 'fr') {
      _this.facade.logger.trace('setting default language to fr');
      return Globalize('fr');
    } else {
      _this.facade.logger.trace('setting default language to en');
      return Globalize('en');
    }
  };

  function Language(facade) {
    this.facade = facade;
    _this = this;

    facade.logger.trace('Loading globalize json data... start');

    // we could use text plugin to load these resources.
    // The problem is that if we do so, these resources will be packed with
    // the javascript code when we run the optimizer (see Gruntfile.js).
    var
      frCalandar = fs.readFileSync('resources/main/fr/ca-gregorian.json'),
      frNumber = fs.readFileSync('resources/main/fr/numbers.json'),
      frCurrency = fs.readFileSync('resources/main/fr/currencies.json'),
      enCalandar = fs.readFileSync('resources/main/en/ca-gregorian.json'),
      enNumber = fs.readFileSync('resources/main/en/numbers.json'),
      enCurrency = fs.readFileSync('resources/main/en/currencies.json'),
      likely = fs.readFileSync('resources/supplemental/likelySubtags.json'),
      currencyData = fs.readFileSync('resources/supplemental/currencyData.json'),
      timeData = fs.readFileSync('resources/supplemental/timeData.json'),
      languageData = fs.readFileSync('resources/supplemental/languageData.json'),
      skinyLng = fs.readFileSync('resources/locales.json');

    Globalize.load(
      JSON.parse(frCalandar), JSON.parse(frNumber), JSON.parse(frCurrency),
      JSON.parse(enCalandar), JSON.parse(enNumber), JSON.parse(enCurrency),
      JSON.parse(likely), JSON.parse(currencyData), JSON.parse(timeData), JSON.parse(languageData)
    );

    Globalize.loadMessages(JSON.parse(skinyLng));

    // default language support
    Globalize.locale('en');

    this.lng = _platformLanguage();

    console.log(this.get('common/hello'));

    facade.logger.trace('Globalize init success');
  }

  Language.prototype = {
    constructor: Language,

    get: function(token) {
      return this.lng.formatMessage(token);
    }
  };

  return Language;
});

