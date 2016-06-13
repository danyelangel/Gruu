(function () {
  'use strict';
  class Service {
    constructor(Actions, Store, $timeout) {
      this.Actions = Actions;
      this.Store = Store;
      this.$timeout = $timeout;
    }
    newStage(stage) {
      return new Promise((resolve, reject) => {
        this.resolveStage = resolve;
        this.rejectStage = reject;
        this.stage = stage;
        this.Store.dispatch({
          type: 'NEW_STAGE',
          stage: stage
        });
      });
    }
    interrupt(process) {
      let prevResolve = this.resolveStage,
          prevReject = this.rejectStage,
          prevStage = Object.assign({}, this.stage),
          self = this;
      function previousStage() {
        self.newStage(prevStage)
          .then(prevResolve)
          .catch(prevReject);
      }
      this.Store.dispatch({
        type: 'CANCEL_STAGE'
      });
      process()
        .then(previousStage)
        .catch(previousStage);
    }
    newMessage(message) {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'NEW_MESSAGE',
          message: message
        });
        this.$timeout(resolve, 500);
      });
    }
    showLoader() {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'SHOW_LOADER'
        });
        resolve();
      });
    }
    hideLoader() {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'HIDE_LOADER'
        });
        resolve();
      });
    }
    do(actionProvider, action, response) {
      let stage = Object.assign({}, this.Store.state.chat.stage),
          inboundResponse = stage.conversation.inboundResponse,
          inboundResMsg = inboundResponse.resolve.messages,
          inboundRejMsg = inboundResponse.reject.messages;
      this.Store.dispatch({
        type: 'SEND_ACTION',
        message: response.message
      });
      this.Actions
        .do(actionProvider, action, response.data)
        .then(this.finishAction(inboundResMsg, true))
        .catch(this.finishAction(inboundRejMsg, false));
    }
    finishAction(messages, isSuccessful) {
      return (payload) => {
        messages = this.addPayload(messages, payload);
        this.$timeout(() => {
          this.Store.dispatch({
            type: 'FINISH_ACTION',
            messages: messages,
            isSuccessful: isSuccessful
          });
        }, 750);
        if (isSuccessful) {
          this.$timeout(this.resolveStage, 750);
        } else {
          this.$timeout(this.rejectStage, 750);
        }
      };
    }
    addPayload(messages, payload) {
      angular.forEach(messages, (value, key) => {
        if (value.payload) {
          messages[key].text = value.text + payload;
        }
      });
      return messages;
    }
  }
  angular
    .module('chat')
    .service('ChatActions', Service);
}());
