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
    interrupt() {
      return (process) => {
        let action = this.Orchestrator[process.action.orchestrator].run(true);
        this.ChatActions.interrupt(action);
      };
    }
  }
  angular
    .module('chat', ['duScroll', 'ngAnimate'])
    .component('chatEl', {
      templateUrl: 'components/chat/chat.html',
      controller: Controller
    });
}());
