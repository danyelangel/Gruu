(function () {
  'use strict';
  class Controller {
    constructor($scope, $document, $timeout) {
      this.$document = $document;
      this.$timeout = $timeout;
      $scope.$watch('$ctrl.conversation', () => {
        $timeout(() => {
          this.scrollToBottom();
        });
      });
    }
    scrollToBottom() {
      let conversation = this.$document[0].getElementById('chat-conversation'),
          bottom = this.$document[0].getElementById('conversation-end'),
          conversationEl = angular.element(conversation),
          bottomEl = angular.element(bottom);
      conversationEl.scrollToElement(bottomEl, 0, 700);
    }
  }
  angular
    .module('chat')
    .component('chatConversation', {
      templateUrl: 'components/chat/conversation/conversation.html',
      controller: Controller,
      transclude: true,
      bindings: {
        conversation: '<',
        isDisabled: '<',
        onRegress: '&'
      }
    });
}());
