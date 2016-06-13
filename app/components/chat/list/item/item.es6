(function () {
  'use strict';
  angular
    .module('chat')
    .component('chatListItem', {
      templateUrl: 'components/chat/list/item/item.html',
      bindings: {
        item: '<'
      }
    });
}());
