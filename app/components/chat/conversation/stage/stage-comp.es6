(function () {
  'use strict';
  angular
    .module('chat')
    .component('chatStage', {
      templateUrl: 'components/chat/conversation/stage/stage.html',
      bindings: {
        state: '<',
        isDisabled: '<',
        onInterrupt: '&'
      }
    });
}());
