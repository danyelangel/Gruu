(function () {
  'use strict';

  class Service {
    constructor(Store) {
      this.Store = Store;
    }
    choosePeople(date) {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'RESERVATION.CHOOSE_PEOPLE',
          data: date
        });
        resolve();
      });
    }
    chooseDate(date) {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'RESERVATION.CHOOSE_DATE',
          data: date
        });
        resolve();
      });
    }
    chooseTime(date) {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'RESERVATION.CHOOSE_TIME',
          data: date
        });
        resolve();
      });
    }
    makeReservation(data) {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'RESERVATION.MAKE_RESERVATION',
          data: data
        });
        resolve();
      });
    }
    getTimes() {
      let date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDay(),
          endHour = 20,
          startHour = 10,
          timesLength = (endHour - startHour) * 2,
          times = [],
          isHalf = false,
          hours, minutes;
      for (let i = 0; i < timesLength; i++) {
        minutes = isHalf ? 30 : 0;
        hours = startHour + Math.floor(i / 2);
        times[i] = new Date(year, month, day, hours, minutes);
        isHalf = !isHalf;
      }
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'RESERVATION.RECEIVE_TIMES',
          data: times
        });
        resolve();
      });
    }
  }
  angular
    .module('gruu.logic.actions')
    .service('ReservationActions', Service);
}());
