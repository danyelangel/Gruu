(function () {
  'use strict';
  class Service {
    constructor(ChatActions, Label, $timeout, OrchestratorLabels, AuthOrchestrator, CuisineOrchestrator, RestaurantOrchestrator) {
      this.ChatActions = ChatActions;
      this.$l = Label.$l(OrchestratorLabels);
      this.Auth = AuthOrchestrator;
      this.Cuisine = CuisineOrchestrator;
      this.Restaurant = RestaurantOrchestrator;
      this.$timeout = $timeout;
      this.queue = [];
      this.defaultQueue = [
        this.begin(),
//        this.Restaurant.run(),
        this.Auth.run(),
        this.Cuisine.run(),
        this.Restaurant.run()
      ];
      this.currentProcess = 0;
    }
    run() {
      return () => {
        let current = this.currentProcess + 1,
            next = this.queue[current];
        this.currentProcess++;
        if (!angular.isFunction(next)) {
          this.queue = this.defaultQueue;
          this.currentProcess = 0;
        }
        this.queue[this.currentProcess]()
          .then(() => {
            this.$timeout(this.run());
          })
          .catch(() => {
            this.$timeout(this.run());
          });
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
    .module('gruu.logic.orchestrator', [])
    .service('Orchestrator', Service)
    .constant('OrchestratorLabels', {
      WELCOME: {
        en: 'Welcome to Gruu'
      }
    });
}());
