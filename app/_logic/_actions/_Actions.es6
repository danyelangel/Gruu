(function () {
  'use strict';
  class Service {
    constructor(AuthActions, CuisineActions, RestaurantActions, ReservationActions) {
      this.Auth = AuthActions;
      this.Cuisine = CuisineActions;
      this.Restaurant = RestaurantActions;
      this.Reservation = ReservationActions;
    }
    do(actionProvider, action, data) {
      return this[actionProvider][action](data);
    }
  }
  angular
    .module('gruu.logic.actions', [])
    .service('Actions', Service);
}());
