(function () {
  'use strict';

  /* @ngdoc object
   * @name gruu
   * @description
   *
   */
  angular
    .module('gruu', [
      'ngComponentRouter',
      'ngMaterial',
      'gruu.logic',
      'gruu.services',
      'chat'
    ]);
}());
