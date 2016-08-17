(function () {
  'use strict';
  class Controller {
    constructor(Store, ChatActions, Orchestrator) {
      this.ChatActions = ChatActions;
      this.Orchestrator = Orchestrator;
      Store.getState((state) => {
        this.state = state;
      });
    }
    get chat() {
      return this.state.chat;
    }
    get keyboard() {
      return this.chat.keyboard;
    }
    get conversation() {
      return this.chat.conversation;
    }
    regress() {
      return (process) => {
        this.Orchestrator.regress(process.processPosition);
        this.ChatActions.cancel();
      };
    }
  }
  angular
    .module('chat', [
      'duScroll',
      'ngAnimate',
      'angular.filter'
    ])
    .component('chatEl', {
      templateUrl: 'components/chat/chat.html',
      controller: Controller
    });
}());
