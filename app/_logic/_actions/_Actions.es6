(function () {
  'use strict';
  class Service {
    constructor(AuthActions, CuisineActions) {
      this.Auth = AuthActions;
      this.Cuisine = CuisineActions;
    }
    do(actionProvider, action, data) {
      return this[actionProvider][action](data);
    }
  }
  angular
    .module('gruu.logic.actions', [])
    .service('Actions', Service);
}());
