(function () {
  'use strict';
  angular
    .module('chat')
    .component('chatBubble', {
      templateUrl: 'components/chat/_components/bubble/bubble.html',
      bindings: {
        message: '<'
      }
    });
}());
