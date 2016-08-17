(function () {
  'use strict';
  class Controller {
    constructor() {}
    get message() {
      return this.item.message;
    }
    get status() {
      return this.message.status ? 'green' : 'red';
    }
  }
  angular
    .module('chat')
    .component('chatListItem', {
      templateUrl: 'components/chat/keyboard/_list/_list-item/list-item.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });
}());
