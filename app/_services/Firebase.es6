(function () {
  'use strict';

  class Service {
    constructor($window) {
      let config = {
        apiKey: 'AIzaSyBehaIxBKT02aLC9NmMdQfN0fswSWmKews',
        authDomain: 'gruu-df5aa.firebaseapp.com',
        databaseURL: 'https://gruu-df5aa.firebaseio.com',
        storageBucket: 'gruu-df5aa.appspot.com'
      };
      $window.firebase.initializeApp(config);
      this.firebase = $window.firebase;
    }
  }
  angular
    .module('gruu.services')
    .service('Firebase', Service);
}());
