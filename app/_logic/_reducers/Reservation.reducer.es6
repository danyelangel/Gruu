(function () {
  'use strict';
  class Service {
    constructor() {
    }
    reducer() {
      let self = this;
      return function (state = {}, action = {}) {
        return {
          // Reservation
          reservation: self.reservationReducer(state.reservation, action),
          // Times
          times: self.timesReducer(state.times, action),
          timesKeyboard: self.timesKeyboardReducer(state.timesKeyboard, action)
        };
      };
    }
    // Reservation
    reservationReducer(state = {}, action = {}) {
      return {
        date: this.dateReducer(state.date, action),
        time: this.timeReducer(state.time, action),
        people: this.peopleReducer(state.people, action)
      };
    }
    // People
    peopleReducer(state, action) {
      switch (action.type) {
        case 'RESERVATION.CHOOSE_PEOPLE':
          return action.data;
        default:
          return state;
      }
    }
    // Date
    dateReducer(state, action) {
      switch (action.type) {
        case 'RESERVATION.CHOOSE_DATE':
          return action.data;
        case 'RESERVATION.RESET_DATE':
          return undefined;
        default:
          return state;
      }
    }
    // Times
    timesReducer(state, action) {
      switch (action.type) {
        case 'RESERVATION.RECEIVE_TIMES':
          return action.data;
        default:
          return state;
      }
    }
    timesKeyboardReducer(state, action) {
      switch (action.type) {
        case 'RESERVATION.RECEIVE_TIMES':
          return {
            type: 'BUBBLES_SCROLL',
            actionProvider: 'Reservation',
            action: 'chooseTime',
            options: this.parseOptions(action.data)
          };
        default:
          return state;
      }
    }
    parseOptions(data) {
      let options = [];
      angular.forEach(data, option => {
        options.push(this.parseOption(option));
      });
      return options;
    }
    parseOption(option) {
      return {
        data: option,
        message: {
          text: this.parseTime(option)
        }
      };
    }
    parseTime(date) {
      let hours = date.getHours(),
          minutes = date.getMinutes();
      return `${hours}:${minutes === 0 ? '00' : minutes}`;
    }
    timeReducer(state, action) {
      switch (action.type) {
        case 'RESERVATION.CHOOSE_TIME':
          return action.data;
        default:
          return state;
      }
    }
  }
  angular
    .module('gruu.logic.reducers')
    .service('ReservationReducer', Service);
}());
