
(function () {
  'use strict';
  class Service {
    constructor(ChatActions) {
      this.ChatActions = ChatActions;
    }
    showLoader() {
      return () => {
        return this.ChatActions.showLoader();
      };
    }
    hideLoader() {
      return () => {
        return this.ChatActions.hideLoader();
      };
    }
  }
  angular
    .module('gruu.logic.orchestrator')
    .service('OrchestratorHelpers', Service);
}());
