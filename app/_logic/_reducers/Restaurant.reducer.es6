(function () {
  'use strict';
  class Service {
    constructor() {
    }
    reducer() {
      let self = this;
      return function (state = {}, action = {}) {
        return {
          restaurants: self.listReducer(state.restaurants, action),
          selected: self.selectedReducer(state.selected, action)
        };
      };
    }
    listReducer(state, action) {
      switch (action.type) {
        case 'RESTAURANT.RECEIVE':
          return action.data;
        default:
          return state;
      }
    }
    selectedReducer(state, action) {
      switch (action.type) {
        case 'RESTAURANT.CHOOSE':
          return action.data;
        default:
          return state;
      }
    }
  }
  angular
    .module('gruu.logic.reducers')
    .service('RestaurantReducer', Service);
}());
