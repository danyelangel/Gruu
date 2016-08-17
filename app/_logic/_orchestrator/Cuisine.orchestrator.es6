(function () {
  'use strict';
  class Service {
    constructor(ChatActions, CuisineLabels, Label, CuisineActions, ChatHelper, Store, OrchestratorHelpers) {
      this.ChatActions = ChatActions;
      this.CuisineActions = CuisineActions;
      this.Helpers = OrchestratorHelpers;
      this.StageHelper = ChatHelper.stage();
      this.Store = Store;
      this.$l = Label.$l(CuisineLabels);
    }
    run() {
      return (processPosition) => {
        console.groupEnd();
        console.group('CUISINE');
        return Promise.resolve()
          .then(this.Helpers.showLoader())
          .then(this.getCuisines())
          .then(this.Helpers.hideLoader())
          .then(this.chooseCuisine(processPosition))
          .catch(this.run());
      };
    }
    getCuisines() {
      let promise = Promise.resolve();
      return () => {
        if (!this.Store.state.cuisine.cuisines) {
          promise = this.CuisineActions.getCuisines();
        }
        return promise;
      };
    }
    chooseCuisine(processPosition) {
      return () => {
        let cuisines = this.Store.state.cuisine.cuisines,
            keyboard = this.getKeyboard(cuisines),
            conversation = this.getConversation(processPosition),
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
    getConversation(processPosition) {
      let req = [this.$l('CHOOSE_CUISINE')],
          resResolve = [],
          resReject = [this.$l('CHOOSE_CUISINE_FAILED')],
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
    getKeyboard(cuisines) {
      let options = [],
          keyboard = {
            actionProvider: 'Cuisine',
            action: 'choose',
            options: options,
            type: 'CARDS'
          };
      angular.forEach(cuisines, (value, key) => {
        options.push({
          data: {
            index: key,
            key: value.$key
          },
          message: {
            title: value.title,
            image: value.image
          }
        });
      });
      return keyboard;
    }
  }
  angular
    .module('gruu.logic.orchestrator')
    .service('CuisineOrchestrator', Service)
    .constant('CuisineLabels', {
      CHOOSE_CUISINE: {
        en: 'What type of food are you looking for?'
      },
      CHOOSE_AGAIN: {
        en: 'Change'
      },
      CHOOSE_CUISINE_FAILED: {
        en: 'Couldn\'t choose cuisine. Please try again.'
      }
    });
}());
