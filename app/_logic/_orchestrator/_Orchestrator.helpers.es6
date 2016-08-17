
(function () {
  'use strict';
  class Service {
    constructor(ChatActions) {
      this.Chat = ChatActions;
    }
    showLoader() {
      return () => {
        return this.Chat.showLoader();
      };
    }
    hideLoader() {
      return () => {
        return this.Chat.hideLoader();
      };
    }
  }
  angular
    .module('gruu.logic.orchestrator')
    .service('OrchestratorHelpers', Service);
}());
