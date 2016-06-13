(function () {
  'use strict';

  class Service {
    constructor(Lang) {
      this.Lang = Lang;
    }
    get lang() {
      return this.Lang.lang;
    }
    $l(labels) {
      return (labelId) => {
        return labels[labelId][this.lang];
      };
    }
  }
  angular
    .module('gruu.services')
    .service('Label', Service);
}());
