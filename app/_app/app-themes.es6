(function () {
  'use strict';

  angular
    .module('gruu')
    .config(config);

  function config($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('green', {
        default: '700'
      })
      .accentPalette('grey', {
        default: '900'
      })
      .backgroundPalette('grey', {
        default: '900'
      }).dark();
    $mdThemingProvider.theme('bright')
      .primaryPalette('green', {
        default: '500'
      })
      .accentPalette('grey', {
        default: '50'
      });
  }
}());
