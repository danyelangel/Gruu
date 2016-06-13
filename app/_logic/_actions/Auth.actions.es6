(function () {
  'use strict';

  class Service {
    constructor(Firebase, $timeout) {
      this.firebase = Firebase.firebase;
      this.auth = this.firebase.auth;
      this.$timeout = $timeout;
    }
    login(data) {
      switch (data.provider) {
        case 'EMAIL':
          return this.emailLogin();
        case 'FACEBOOK':
          return this.facebookLogin();
        default:
          return this.facebookLogin();
      }
    }
    emailLogin() {
      return new Promise((resolve) => {
        resolve('Daniel');
      });
    }
    facebookLogin() {
      let provider = new this.auth.FacebookAuthProvider();
      return new Promise((resolve, reject) => {
        this.auth().signInWithRedirect(provider).catch(reject);
      });
    }
    checkAuth() {
      return new Promise((resolve, reject) => {
        this.$timeout(() => {
          if (this.auth().currentUser) {
            resolve(this.auth().currentUser.displayName);
          } else {
            reject();
          }
        }, 2000);
      });
    }
  }
  angular
    .module('gruu.logic.actions')
    .service('AuthActions', Service);
}());
