(function () {
  'use strict';
  angular
    .module('chat')
    .component('chatBubble', {
      templateUrl: 'components/chat/bubble/bubble.html',
      bindings: {
        message: '<'
      }
    });
}());
