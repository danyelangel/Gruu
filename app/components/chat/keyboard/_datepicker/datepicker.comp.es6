(function () {
  'use strict';
  class Controller {
    constructor($scope, $filter, $document, $timeout) {
      console.groupCollapsed('OPEN-DATEPICKER');
      this.$timeout = $timeout;
      $timeout(() => {
        let datepicker = angular.element(
            $document[0].querySelector('md-datepicker')),
            controller;
        /*eslint-disable */
        controller = datepicker
          .controller('mdDatepicker');
        /*eslint-enable */
        controller
          .$scope
          .$watch(
            'ctrl.isCalendarOpen',
            this.checkClosed()
          );
      }, 250);
      $timeout(() => {
        this.showCalendar = true;
      }, 100);
      $scope.$watch('$ctrl.date', (date) => {
        if (date) {
          this.onSelect()(null, {
            data: date,
            message: {
              text: $filter('date')(date)
            }
          });
        }
      });
    }
    checkClosed() {
      return (isOpen) => {
        if (!isOpen) {
          this.$timeout(() => {
            this.onClose();
          }, 300);
        }
      };
    }
  }
  angular
    .module('chat')
    .component('chatDatepicker', {
      templateUrl: 'components/chat/keyboard/_datepicker/datepicker.html',
      controller: Controller,
      bindings: {
        parameters: '<',
        onSelect: '&',
        onClose: '&'
      }
    });
}());
