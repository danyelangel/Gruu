(function () {
  'use strict';
  class DialogController {
    constructor($mdDialog, $mdBottomSheet, $document, Label, ListLabels) {
      this.$mdDialog = $mdDialog;
      this.$mdBottomSheet = $mdBottomSheet;
      this.$document = $document;
      this.filter = {
        sort: this.defaultSort
      };
      this.$l = Label.$l(ListLabels);
    }
    get element() {
      let element = this.$document[0].getElementById('list-dialog-wrapper');
      return angular.element(element);
    }
    openFilter() {
      let self = this;
      class FilterController {
        constructor() {
          this.$mdBottomSheet = self.$mdBottomSheet;
          this.filter = self.filter;
          this.sort = self.sort;
          this.flags = self.flags;
          this.$l = self.$l;
        }
        close() {
          this.$mdBottomSheet.hide(this.filter);
        }
      }
      this.$mdBottomSheet
        .show({
          templateUrl: '/components/chat/keyboard/_list/list-filter.html',
          controller: FilterController,
          controllerAs: '$ctrl',
          parent: this.element
        });
    }
    pickFiltered() {
      return (item) => {
        let isAllowed = true;
        angular.forEach(this.filter.flags, (value, key) => {
          if (item.flags.indexOf(key) === -1 && value) {
            isAllowed = false;
          }
        });
        return isAllowed;
      };
    }
    cancel() {
      this.$mdDialog.cancel();
    }
    select($index, item) {
      this.$mdDialog.hide({
        $index: $index,
        item: item
      });
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
          templateUrl: '/components/chat/keyboard/_list/list.html',
          locals: {
            options: this.options,
            flags: this.filter.flags,
            sort: this.filter.sort,
            defaultSort: this.filter.defaultSort,
            title: this.title
          },
          bindToController: true,
          fullscreen: true
        })
        .then((payload) => {
          this.onSelect()(payload.$index, payload.item);
        });
    }
  }
  angular
    .module('chat')
    .component('chatList', {
      templateUrl: '/components/chat/keyboard/_list/list-wrapper.html',
      controller: Controller,
      bindings: {
        options: '<',
        filter: '<',
        title: '<',
        onSelect: '&'
      }
    })
    .constant('ListLabels', {
      ALL: {
        en: 'All'
      },
      CLOSE: {
        en: 'Close'
      },
      RESET: {
        en: 'Reset'
      },
      SORT_BY: {
        en: 'Sort By'
      },
      FLAGS: {
        en: 'Flags'
      }
    });
}());
