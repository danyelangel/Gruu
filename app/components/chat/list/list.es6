(function () {
  'use strict';
  class FilterController {}
  class DialogController {
    constructor($mdDialog, $mdBottomSheet, $document, $timeout) {
      this.$mdDialog = $mdDialog;
      this.$mdBottomSheet = $mdBottomSheet;
      this.$document = $document;
      $timeout(() => {
        this.getElement();
      }, 250);
    }
    getElement() {
      let element = this.$document[0].getElementById('list-dialog-wrapper');
      this.element = angular.element(element);
    }
    filter() {
      this.$mdBottomSheet
        .show({
          templateUrl: 'components/chat/list/list-filter.html',
          controller: FilterController,
          controllerAs: '$ctrl',
          parent: this.element
        })
        .then((filter) => {
          this.filter = filter;
        });
    }
    cancel() {
      this.$mdDialog.cancel();
    }
    price() {
      return '$30K - $50K';
    }
  }
  class Controller {
    constructor($mdDialog) {
      this.$mdDialog = $mdDialog;
    }
    $onInit() {
      this.showList();
    }
    showList(ev) {
      this.$mdDialog
        .show({
          controller: DialogController,
          controllerAs: '$ctrl',
          targetEventL: ev,
          templateUrl: 'components/chat/list/list-dialog.html',
          locals: {
            options: this.options
          },
          bindToController: true,
          fullscreen: true
        })
        .then((selection) => {
          this.onSelect(selection);
        });
    }
  }
  angular
    .module('chat')
    .component('chatList', {
      templateUrl: 'components/chat/list/list-wrapper.html',
      controller: Controller,
      bindings: {
        options: '<',
        onSelect: '&'
      }
    });
}());
