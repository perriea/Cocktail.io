(function() {
  'use strict';

  angular
    .module('cocktail.io')
    .directive('encodingGenerator', encodingGenerator);

  /** @ngInject */
  function encodingGenerator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/generator-html-encoding/encoding-generator/encoding.html',
      scope: {
      },
      controller: EncodingController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function EncodingController(Generator, $location, ThrowErrorFactory) {
      var vm     = this;
      vm.loading = false;

      vm.characters = [
       {
        character: 'À',
        decimal: '&#192;',
        hexadecimal: '&#xc0;',
        ascii: '&Agrave;',
        name: 'Capital A-grave'
      },
      {
        character: 'à',
        decimal: '&#224;',
        hexadecimal: '&#xe0;',
        ascii: '&agrave;',
        name: 'Lowercase a-grave'
      },
      {
        character: 'Â',
        decimal: '&#194;',
        hexadecimal: '&#xc2;',
        ascii: '&Acirc;',
        name: 'Capital A-circumflex'
      },
      {
        character: 'â',
        decimal: '&#226;',
        hexadecimal: '&#xe2;',
        ascii: '&acirc;',
        name: 'Lowercase a-circumflex'
      },
      {
        character: 'Æ',
        decimal: '&#198;',
        hexadecimal: '&#xc6;',
        ascii: '&AElig;',
        name: 'Capital AE Ligature'
      },
      {
        character: 'æ',
        decimal: '&#230;',
        hexadecimal: '&#xe6;',
        ascii: '&aelig;',
        name: 'Lowercase AE Ligature'
      },
      {
        character: 'Ç',
        decimal: '&#199;',
        hexadecimal: '&#xc7;',
        ascii: '&Ccedil;',
        name: 'Capital C-cedilla'
      },
      {
        character: 'ç',
        decimal: '&#231;',
        hexadecimal: '&#xe7;',
        ascii: '&ccedil;',
        name: 'Lowercase c-cedilla'
      },
      {
        character: 'È',
        decimal: '&#200;',
        hexadecimal: '&#xc8;',
        ascii: '&Egrave;',
        name: 'Capital E-grave'
      },
      {
        character: 'è',
        decimal: '&#232;',
        hexadecimal: '&#xe8;',
        ascii: '&egrave;',
        name: 'Lowercase e-grave'
      },
      {
        character: 'É',
        decimal: '&#201;',
        hexadecimal: '&#xc9;',
        ascii: '&Eacute;',
        name: 'Capital E-acute'
      },
      {
        character: 'é',
        decimal: '&#233;',
        hexadecimal: '&#xe9;',
        ascii: '&eacute;',
        name: 'Lowercase e-acute'
      },
      {
        character: 'Ê',
        decimal: '&#202;',
        hexadecimal: '&#xca;',
        ascii: '&Ecirc;',
        name: 'Capital E-circumflex'
      },
      {
        character: 'ê',
        decimal: '&#234;',
        hexadecimal: '&#xea;',
        ascii: '&ecirc;',
        name: 'Lowercase e-circumflex'
      },
      {
        character: 'Ë',
        decimal: '&#203;',
        hexadecimal: '&#xcb;',
        ascii: '&Euml;',
        name: 'Capital E-umlaut'
      },
      {
        character: 'ë',
        decimal: '&#235;',
        hexadecimal: '&#xeb;',
        ascii: '&euml;',
        name: 'Lowercase e-umlaut'
      },
      {
        character: 'Î',
        decimal: '&#206;',
        hexadecimal: '&#xce;',
        ascii: '&Icirc;',
        name: 'Capital I-circumflex'
      },
      {
        character: 'î',
        decimal: '&#238;',
        hexadecimal: '&#xee;',
        ascii: '&icirc;',
        name: 'Lowercase i-circumflex'
      },
      {
        character: 'Ï',
        decimal: '&#207;',
        hexadecimal: '&#xcf;',
        ascii: '&Iuml;',
        name: 'Capital I-umlaut'
      },
      {
        character: 'ï',
        decimal: '&#239;',
        hexadecimal: '&#xef;',
        ascii: '&iuml;',
        name: 'Lowercase i-umlaut'
      },
      {
        character: 'Ô',
        decimal: '&#212;',
        hexadecimal: '&#xd4;',
        ascii: '&Ocirc;',
        name: 'Capital O-circumflex'
      },
      {
        character: 'ô',
        decimal: '&#244;',
        hexadecimal: '&#xf4;',
        ascii: '&ocirc;',
        name: 'Lowercase o-circumflex'
      },
      {
        character: 'Œ',
        decimal: '&#140;',
        hexadecimal: '&#x8c;',
        ascii: '&OElig;',
        name: 'Capital OE ligature'
      },
      {
        character: 'œ',
        decimal: '&#156;',
        hexadecimal: '&#x9c;',
        ascii: '&oelig;',
        name: 'Lowercase oe ligature'
      },
      {
        character: 'Ù',
        decimal: '&#217;',
        hexadecimal: '&#xd9;',
        ascii: '&Ugrave;',
        name: 'Capital U-grave'
      },
      {
        character: 'ù',
        decimal: '&#249;',
        hexadecimal: '&#xf9;',
        ascii: '&ugrave;',
        name: 'Lowercase u-grave'
      },
      {
        character: 'Û',
        decimal: '&#219;',
        hexadecimal: '&#xdb;',
        ascii: '&Ucirc;',
        name: 'Capital U-circumflex'
      },
      {
        character: 'û',
        decimal: '&#251;',
        hexadecimal: '&#xfb;',
        ascii: '&ucirc;',
        name: 'Lowercase U-circumflex'
      },
      {
        character: 'Ü',
        decimal: '&#220;',
        hexadecimal: '&#xdc;',
        ascii: '&Uuml;',
        name: 'Capital U-umlaut'
      },
      {
        character: 'ü',
        decimal: '&#252;',
        hexadecimal: '&#xfc;',
        ascii: '&uuml;',
        name: 'Lowercase U-umlaut'
      },
      {
        character: '«',
        decimal: '&#171;',
        hexadecimal: '&#xab;',
        ascii: '&laquo;',
        name: 'Left angle quotes'
      },
      {
        character: '»',
        decimal: '&#187;',
        hexadecimal: '&#xbb;',
        ascii: '&raquo;',
        name: 'Right angle quotes'
      },
      {
        character: '€',
        decimal: '&#128;',
        hexadecimal: '&#x80;',
        ascii: '&euro;',
        name: 'Euro'
      },
      {
        character: '₣',
        decimal: '&#8355;',
        hexadecimal: '&#x20a3;',
        ascii: '',
        name: 'Franc'
      }   
    ];

      vm.sendRequest    = sendRequest;

      function sendRequest() {
        if (vm.loading === true) {
          return ;
        }
        vm.loading = true;

        Generator
        .getEncoding({
        }).$promise
        .then(callBackSuccess)
        ["catch"](callBackError)
        ["finally"](callBackFinally);
      }

      function callBackSuccess (result) {
        vm.result = result;
      }
      function callBackError (error) {
        ThrowErrorFactory.throwError("Une erreur est survenue lors de la récupération des données");
      }

      function callBackFinally () {
        vm.loading = false;
      }
    }
  }

})();
