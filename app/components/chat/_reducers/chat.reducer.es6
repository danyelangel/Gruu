(function () {
  'use strict';
  class Service {
    constructor(ChatConversationReducer, ChatKeyboardReducer) {
      this.conversationReducer = ChatConversationReducer.reducer();
      this.keyboardReducer = ChatKeyboardReducer.reducer();
    }
    reducer() {
      let keyboardReducer = this.keyboardReducer,
          conversationReducer = this.conversationReducer,
          stageReducer = this.stageReducer();
      return function (state = {}, action = {}) {
        let conversation = state.conversation,
            keyboard = state.keyboard,
            stage = state.stage;
        return {
          conversation: conversationReducer(conversation, action),
          keyboard: keyboardReducer(keyboard, action),
          stage: stageReducer(stage, action)
        };
      };
    }
    stageReducer() {
      return function (state = {}, action = {}) {
        switch (action.type) {
          case 'NEW_STAGE':
            return action.stage;
          default:
            return state;
        }
      };
    }
  }
  angular
    .module('chat')
    .service('ChatReducer', Service);
}());
