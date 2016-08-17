(function () {
  'use strict';

  angular
    .module('gruu')
    .config(config);

  function config($mdThemingProvider) {
    let defaultColor = 'green',
        brightness = '600';
    $mdThemingProvider.theme('default')
      .primaryPalette(defaultColor, {
        default: brightness
      })
      .accentPalette('grey', {
        default: '900'
      }).dark();
    $mdThemingProvider.theme('bright')
      .primaryPalette(defaultColor, {
        default: brightness
      })
      .accentPalette('grey', {
        default: '50'
      });
    $mdThemingProvider.theme('red')
      .primaryPalette('red');
    $mdThemingProvider.theme('green')
      .primaryPalette('green');
  }
}());
