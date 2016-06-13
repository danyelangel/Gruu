(function () {
  'use strict';

  class Service {
    constructor() {
    }
    get lang() {
      return 'en';
    }
  }
  angular
    .module('gruu.services')
    .service('Lang', Service);
}());
