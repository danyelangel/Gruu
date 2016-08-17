(function () {
  'use strict';
  angular
    .module('chat')
    .component('chatCard', {
      templateUrl: 'components/chat/_components/card/card.html',
      bindings: {
        message: '<',
        regress: '<',
        isDisabled: '<',
        onRegress: '&'
      }
    });
}());
