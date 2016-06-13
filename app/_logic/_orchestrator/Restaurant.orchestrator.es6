(function () {
  'use strict';
  class Service {
    constructor(ChatActions, RestaurantLabels, Label, RestaurantActions, ChatHelper, Store, OrchestratorHelpers) {
      this.ChatActions = ChatActions;
      this.RestaurantActions = RestaurantActions;
      this.Helpers = OrchestratorHelpers;
      this.StageHelper = ChatHelper.stage();
      this.Store = Store;
      this.$l = Label.$l(RestaurantLabels);
    }
    run() {
      return () => {
        console.groupEnd();
        console.group('RESTAURANT');
        return Promise.resolve()
          .then(this.Helpers.showLoader())
          .then(this.getList())
          .then(this.Helpers.hideLoader())
          .then(this.choose());
      };
    }
    getList() {
      return () => {
        return this.RestaurantActions.getList();
      };
    }
    choose() {
      return () => {
        let restaurants = this.Store.state.restaurant.restaurants,
            keyboard = this.getKeyboard(restaurants),
            conversation = this.getConversation(),
            stage = {
              keyboard: keyboard,
              conversation: conversation
            };
        return new Promise((resolve) => {
          this.ChatActions
            .newStage(stage)
            .then(() => {
              resolve();
            });
        });
      };
    }
    getConversation() {
      let req = [this.$l('CHOOSE_RESTAURANT')],
          resResolve = [],
          resReject = [this.$l('CHOOSE_RESTAURANT_FAILED')],
          action = {
            text: this.$l('CHOOSE_AGAIN'),
            action: {
              orchestrator: 'Restaurant'
            }
          },
          conversation = this.StageHelper.getConversation(
            req,
            resResolve,
            resReject,
            action
          );
      return conversation;
    }
    getKeyboard(data) {
      let options = [],
          keyboard = {
            actionProvider: 'Restaurant',
            action: 'choose',
            options: options,
            type: 'LIST'
          };
      angular.forEach(data, (value, key) => {
        options.push({
          data: {
            index: key,
            key: value.$key
          },
          message: value
        });
      });
      return keyboard;
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
      }
    });
}());
