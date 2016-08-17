(function () {
  'use strict';
  angular
    .module('chat')
    .component('chatStage', {
      templateUrl: 'components/chat/conversation/_stage/stage.html',
      bindings: {
        state: '<',
        isDisabled: '<',
        onRegress: '&'
      }
    });
}());
