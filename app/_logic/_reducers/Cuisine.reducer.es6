(function () {
  'use strict';
  class Service {
    constructor() {
    }
    reducer() {
      let self = this;
      return function (state = {}, action = {}) {
        return {
          cuisines: self.cuisinesReducer(state.cuisines, action),
          selected: self.selectedReducer(state.selected, action)
        };
      };
    }
    cuisinesReducer(state, action) {
      switch (action.type) {
        case 'RECEIVE_CUISINES':
          return this.receiveCuisines(state, action);
        default:
          return state;
      }
    }
    selectedReducer(state, action) {
      switch (action.type) {
        case 'CHOOSE_CUISINE':
          return action.cuisine;
        default:
          return state;
      }
    }
    receiveCuisines(state, action) {
      return action.cuisines;
    }
  }
  angular
    .module('gruu.logic.reducers')
    .service('CuisineReducer', Service);
}());
