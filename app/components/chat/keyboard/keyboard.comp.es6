(function () {
  'use strict';
  class Controller {
    constructor(ChatActions, $timeout) {
      this.$timeout = $timeout;
      this.ChatActions = ChatActions;
    }
    do() {
      return ($index, option) => {
        if (!this.hideOptions) {
          this.addStyling($index);
          this.$timeout(() => {
            this.ChatActions.do(
              this.keyboard.actionProvider,
              this.keyboard.action,
              option);
          }, 333);
        }
      };
    }
    skip() {
      return () => {
        if (!this.hideOptions) {
          this.addStyling(false);
          this.$timeout(() => {
            this.ChatActions.skip();
          }, 333);
        }
      };
    }
    cancel() {
      return () => {
        console.log('plop');
      };
    }
    closeDatepicker() {
      this.hideCalendar = true;
      console.groupEnd();
    }
    addStyling($index) {
      this.hideOptions = true;
      this.chosen = $index;
    }
    removeStyling() {
      this.hideOptions = null;
      this.chosen = null;
    }
    getOptionClass($index, $first, $last) {
      return {
        first: $first,
        last: $last,
        chosen: this.chosen === $index,
        hidden: this.hideOptions && this.chosen !== $index
      };
    }
  }
  angular
    .module('chat')
    .component('chatKeyboard', {
      templateUrl: 'components/chat/keyboard/keyboard.html',
      controller: Controller,
      bindings: {
        keyboard: '<'
      }
    });
}());
