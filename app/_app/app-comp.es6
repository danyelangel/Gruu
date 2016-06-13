(function () {
  'use strict';
  class Controller {
    constructor(Orchestrator) {
      this.Orchestrator = Orchestrator;
    }
    $onInit() {
      this.Orchestrator.run()();
    }
  }
  angular
    .module('gruu')
    .value('$routerRootComponent', 'rootEl')
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(false);
    })
    .component('rootEl', {
      template: '<ng-outlet></ng-outlet>',
      controller: Controller,
      $routeConfig: [
        {
          path: '/chat',
          name: 'Chat',
          component: 'chatEl',
          useAsDefault: true
        }
      ]
    });
}());
