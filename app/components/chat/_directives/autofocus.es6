(function () {
  'use strict';
  angular
    .module('chat')
    .directive('autoFocus', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element) {
          $timeout(function () {
            element[0].focus();
          }, 100);
        }
      };
    })
    .directive('inputAutoFocus', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element) {
          $timeout(function () {
            element[0]
              .getElementsByTagName('input')[0]
              .focus();
          }, 100);
        }
      };
    });
}());
