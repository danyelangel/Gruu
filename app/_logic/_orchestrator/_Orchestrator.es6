(function () {
  'use strict';
  class Service {
    constructor(
      $timeout,
      Store,
      AppOrchestrator,
      AuthOrchestrator,
      CuisineOrchestrator,
      RestaurantOrchestrator,
      ReservationOrchestrator
    ) {
      this.$timeout = $timeout;
      this.Store = Store;
      this.App = AppOrchestrator;
      this.Auth = AuthOrchestrator;
      this.Cuisine = CuisineOrchestrator;
      this.Restaurant = RestaurantOrchestrator;
      this.Reservation = ReservationOrchestrator;
      this.queue = [];
      this.defaultQueue = [
        this.App.run(),
        this.Auth.run(),
        this.Cuisine.run(),
        this.Restaurant.run(),
        this.Reservation.runPeople(),
        this.Reservation.runDate(),
        this.Reservation.runTime()
      ];
      this.currentProcess = 0;
    }
    run() {
      return () => {
        let current = this.currentProcess,
            next = this.queue[current];
        if (!angular.isFunction(next)) {
          this.queue = this.queue.concat(this.defaultQueue);
        }
        next = this.queue[current];
        next(current)
          .then(() => {
            this.$timeout(this.run());
          })
          .catch(() => {
            this.$timeout(this.run());
          });
        this.currentProcess++;
      };
    }
    regress(processPosition) {
      this.currentProcess = processPosition;
      this.Store.dispatch({
        type: 'REGRESS_STATE',
        data: processPosition
      });
    }
  }
  angular
    .module('gruu.logic.orchestrator', [])
    .service('Orchestrator', Service);
}());
