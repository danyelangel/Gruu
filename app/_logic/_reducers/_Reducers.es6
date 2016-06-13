(function () {
  'use strict';
  class Service {
    constructor(ChatReducer, CuisineReducer, RestaurantReducer) {
      this.chatReducer = ChatReducer.reducer();
      this.cuisineReducer = CuisineReducer.reducer();
      this.restaurantReducer = RestaurantReducer.reducer();
    }
    rootReducer() {
      let self = this;
      return function (state = {}, action = {}) {
        return {
          chat: self.chatReducer(state.chat, action),
          cuisine: self.cuisineReducer(state.cuisine, action),
          restaurant: self.restaurantReducer(state.restaurant, action)
        };
      };
    }
  }
  angular
    .module('gruu.logic.reducers', [])
    .service('Reducers', Service);
}());
