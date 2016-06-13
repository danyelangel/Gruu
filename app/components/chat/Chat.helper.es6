(function () {
  'use strict';
  class Service {
    constructor() {
    }
    stage() {
      return {
        getConversation: this.getConversation()
      };
    }
    getConversation() {
      return (req, resResolve, resReject, action) => {
        let request = [],
            responseResolve = [],
            responseReject = [];
        angular.forEach(req, (value) => {
          if (angular.isString(value)) {
            request.push({
              text: value
            });
          } else {
            request.push(value);
          }
        });
        angular.forEach(resResolve, (value) => {
          if (angular.isString(value)) {
            responseResolve.push({
              text: value
            });
          } else {
            responseResolve.push(value);
          }
        });
        angular.forEach(resReject, (value) => {
          if (angular.isString(value)) {
            responseReject.push({
              text: value
            });
          } else {
            responseReject.push(value);
          }
        });
        return {
          inboundRequest: {
            messages: request
          },
          inboundResponse: {
            resolve: {
              messages: responseResolve
            },
            reject: {
              messages: responseReject
            }
          },
          action: action
        };
      };
    }
  }
  angular
    .module('chat')
    .service('ChatHelper', Service);
}());
