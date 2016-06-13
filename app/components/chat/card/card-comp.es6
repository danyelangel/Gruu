(function () {
  'use strict';
  angular
    .module('chat')
    .component('chatCard', {
      templateUrl: 'components/chat/card/card.html',
      bindings: {
        message: '<',
        action: '<',
        isDisabled: '<',
        onFire: '&'
      }
    });
}());
