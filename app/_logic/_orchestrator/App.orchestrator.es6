(function () {
  'use strict';
  class Service {
    constructor(ChatActions, AppLabels, Label) {
      this.ChatActions = ChatActions;
      this.$l = Label.$l(AppLabels);
    }
    run() {
      return () => {
        console.groupEnd();
        console.group('APP');
        return Promise.resolve()
          .then(this.begin());
      };
    }
    begin() {
      let message = {
        text: this.$l('WELCOME')
      };
      return () => {
        console.groupEnd();
        console.group('BEGIN');
        return this.ChatActions.newMessage(message);
      };
    }
  }
  angular
    .module('gruu.logic.orchestrator')
    .service('AppOrchestrator', Service)
    .constant('AppLabels', {
      WELCOME: {
        en: 'Welcome to Gruu'
      }
    });
}());
