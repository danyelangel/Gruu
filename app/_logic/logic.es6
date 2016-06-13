(function () {
  'use strict';

  /* @ngdoc object
   * @name gruu
   * @description
   *
   */
  angular
    .module('gruu.logic', [
      'gruu.logic.actions',
      'gruu.logic.reducers',
      'gruu.logic.store',
      'gruu.logic.orchestrator'
    ]);
}());
