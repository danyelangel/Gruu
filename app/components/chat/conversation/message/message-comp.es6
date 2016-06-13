(function () {
  'use strict';
  class Controller {
    constructor() {
    }
  }
  angular
    .module('chat')
    .component('chatMessage', {
      templateUrl: 'components/chat/conversation/message/message.html',
      controller: Controller,
      bindings: {
        message: '<',
        isDisabled: '<',
        loading: '<',
        action: '<',
        onFire: '&'
      }
    });
}());
