(function () {
  'use strict';
  class Service {
    constructor(
      ChatActions,
      RestaurantActions,
      OrchestratorHelpers,
      ChatHelper,
      Store,
      RestaurantLabels,
      Label
    ) {
      this.ChatActions = ChatActions;
      this.RestaurantActions = RestaurantActions;
      this.Helpers = OrchestratorHelpers;
      this.StageHelper = ChatHelper.stage();
      this.Store = Store;
      this.$l = Label.$l(RestaurantLabels);
    }
    run() {
      return (processPosition) => {
        console.groupEnd();
        console.group('RESTAURANT');
        return Promise.resolve()
          .then(this.Helpers.showLoader())
          .then(this.getList())
          .then(this.Helpers.hideLoader())
          .then(this.choose(processPosition));
      };
    }
    getList() {
      let promise = Promise.resolve();
      return () => {
        if (!this.Store.state.restaurant.restaurants) {
          promise = this.RestaurantActions.getList();
        }
        return promise;
      };
    }
    choose(processPosition) {
      return () => {
        let keyboard = this.Store.state.restaurant.keyboard,
            conversation = this.getConversation(processPosition),
            stage = {
              keyboard: keyboard,
              conversation: conversation
            };
        return this.ChatActions.newStage(stage);
      };
    }
    getConversation(processPosition) {
      let req = [this.$l('CHOOSE_RESTAURANT')],
          resResolve = [],
          resReject = [this.$l('CHOOSE_RESTAURANT_FAILED')],
          regress = {
            text: this.$l('CHOOSE_AGAIN'),
            processPosition: processPosition
          },
          conversation = this.StageHelper.getConversation(
            req,
            resResolve,
            resReject,
            regress
          );
      return conversation;
    }
  }
  angular
    .module('gruu.logic.orchestrator')
    .service('RestaurantOrchestrator', Service)
    .constant('RestaurantLabels', {
      CHOOSE_RESTAURANT: {
        en: 'Choose a restaurant'
      },
      CHOOSE_AGAIN: {
        en: 'Change'
      },
      CHOOSE_RESTAURANT_FAILED: {
        en: 'Couldn\'t choose restaurant. Please try again.'
      },
      RESTAURANTS: {
        en: 'Restaurants'
      },
      PRICE: {
        en: 'Price'
      },
      RATING: {
        en: 'Rating'
      },
      WIFI: {
        en: 'Wi-Fi'
      },
      PARKING: {
        en: 'Parking'
      },
      PICKUP: {
        en: 'Pick Up'
      }
    });
}());
