(function () {
  'use strict';
  class Service {
    constructor(ChatReducer, CuisineReducer, RestaurantReducer, ReservationReducer) {
      this.chat = ChatReducer.reducer();
      this.cuisine = CuisineReducer.reducer();
      this.restaurant = RestaurantReducer.reducer();
      this.reservation = ReservationReducer.reducer();
    }
    rootReducer() {
      let self = this;
      return function (state = {}, action = {}) {
        return {
          chat: self.chat(state.chat, action),
          cuisine: self.cuisine(state.cuisine, action),
          restaurant: self.restaurant(state.restaurant, action),
          reservation: self.reservation(state.reservation, action)
        };
      };
    }
  }
  angular
    .module('gruu.logic.reducers', [])
    .service('Reducers', Service);
}());
