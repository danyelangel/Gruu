(function () {
  'use strict';
  class Service {
    constructor(Reducers, $rootScope, $timeout) {
      this.rootReducer = Reducers.rootReducer();
      this.state = this.rootReducer();
      this.callbacks = [];
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
    }
    getState(callback) {
      let newState = Object.assign({}, this.state);
      if (angular.isFunction(callback)) {
        this.callbacks.push(callback);
        callback(newState);
        return this.unsubscribe(callback, this.callbacks.length - 1);
      }
    }
    fireCallbacks(newState) {
      angular.forEach(this.callbacks, (callback) => {
        callback(newState);
      });
//      this.$rootScope.$apply();
    }
    unsubscribe(callback, position) {
      return () => {
        this.callbacks.splice(position, 1);
      };
    }
    dispatchAction() {
      return action => {
        this.state = this.rootReducer(this.state, action);
      };
    }
    dispatchWithMiddleware(action) {
      let newState;
      this.log(action, this, this.dispatchAction());
      newState = Object.assign({}, this.state);
      this.fireCallbacks(newState);
      this.applyScope();
    }
    log(action, store, dispatch) {
      console.groupCollapsed(action.type);
      console.info('dispatching', action);
      console.log('prev state', store.state);
      dispatch(action);
      console.log('next state', store.state);
      console.groupEnd(action.type);
    }
    dispatch(action) {
      this.dispatchWithMiddleware(action);
    }
    applyScope() {
      this.$timeout(() => {
        this.$rootScope.$apply();
      });
    }
  }
  angular
    .module('gruu.logic.store', [])
    .service('Store', Service);
}());
