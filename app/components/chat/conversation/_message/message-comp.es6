(function () {
  'use strict';
  angular
    .module('chat')
    .component('chatMessage', {
      templateUrl: 'components/chat/conversation/_message/message.html',
      bindings: {
        message: '<',
        isDisabled: '<',
        loading: '<',
        regress: '<',
        onRegress: '&'
      }
    });
}());
