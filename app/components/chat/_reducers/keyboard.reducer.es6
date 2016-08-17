(function () {
  'use strict';
  class Service {
    constructor() {
      this.initialState = {};
    }
    reducer() {
      let self = this;
      return function (state = self.initialState, action = {}) {
        switch (action.type) {
          case 'NEW_STAGE':
            return self.newAction(state, action);
          case 'REMOVE_STAGE':
            return {};
          case 'SEND_ACTION':
            return {};
          default:
            return state;
        }
      };
    }
    newAction(state, action) {
      let stage = action.stage,
          keyboard = Object.assign(stage.keyboard, {enabled: true});
      return keyboard;
    }
  }
  angular
    .module('chat')
    .service('ChatKeyboardReducer', Service);
}());
