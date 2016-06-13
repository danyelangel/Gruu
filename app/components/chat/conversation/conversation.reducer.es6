(function () {
  'use strict';
  class Service {
    constructor() {
      this.initialStage = {
        isResolved: false,
        isSuccessful: false,
        showLoader: false,
        inboundRequest: {},
        outbound: {},
        inboundResponse: {}
      };
      this.initialState = [];
    }
    reducer() {
      let self = this;
      return function (state = self.initialState, action = {}) {
        switch (action.type) {
          case 'NEW_MESSAGE':
            return self.newMessage(state, action);
          case 'NEW_STAGE':
            return self.newStage(state, action);
          case 'CANCEL_STAGE':
            return self.cancelStage(state);
          case 'SEND_ACTION':
            return self.sendAction(state, action);
          case 'FINISH_ACTION':
            return self.finishAction(state, action);
          case 'SHOW_LOADER':
            return self.showLoader(state);
          case 'HIDE_LOADER':
            return self.hideLoader(state);
          default:
            return state;
        }
      };
    }
    newMessage(state, action) {
      let initialStage = Object.assign({}, this.initialStage),
          inboundRequest = {
            inboundRequest: {
              messages: [action.message]
            }
          },
          newStage = Object.assign(initialStage, inboundRequest),
          newState = Object.assign([], state);
      newState.push(newStage);
      return newState;
    }
    newStage(state, action) {
      let initialStage = Object.assign({}, this.initialStage),
          actionObj = {
            action: action.stage.conversation.action
          },
          inbound = {
            inboundRequest: action.stage.conversation.inboundRequest
          },
          newStage = Object.assign(initialStage, inbound, actionObj),
          newState = Object.assign([], state);
      newState.push(newStage);
      return newState;
    }
    cancelStage(state) {
      let newState = Object.assign([], state);
      newState.splice(newState.length - 1, 1);
      return newState;
    }
    sendAction(state, action) {
      let outbound = {
            outbound: {
              messages: [
                action.message
              ]
            },
            showLoader: true
          },
          updatedChat = Object.assign({}, state[state.length - 1], outbound),
          newState = Object.assign([], state);
      newState[state.length - 1] = updatedChat;
      return newState;
    }
    finishAction(state, action) {
      let inboundResponse = {
            inboundResponse: {
              messages: action.messages
            },
            showLoader: false,
            isResolved: true,
            isSuccessful: action.isSuccessful
          },
          updatedChat = Object.assign({}, state[state.length - 1], inboundResponse),
          newState = Object.assign([], state);
      newState[state.length - 1] = updatedChat;
      return newState;
    }
    showLoader(state) {
      let loader = {
            showLoader: true
          },
          newStage = Object.assign({}, loader),
          newState = Object.assign([], state);
      newState.push(newStage);
      return newState;
    }
    hideLoader(state) {
      let newState = Object.assign([], state);
      newState.splice(newState.length - 1, 1);
      return newState;
    }
  }
  angular
    .module('chat')
    .service('ChatConversationReducer', Service);
}());
