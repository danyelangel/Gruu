(function () {
  'use strict';
  class Service {
    constructor(ChatActions, AuthLabels, Label, AuthActions, ChatHelper, OrchestratorHelpers) {
      this.ChatActions = ChatActions;
      this.AuthActions = AuthActions;
      this.Helpers = OrchestratorHelpers;
      this.StageHelper = ChatHelper.stage();
      this.$l = Label.$l(AuthLabels);
    }
    run() {
      return () => {
        console.groupEnd();
        console.group('AUTH');
        return Promise.resolve()
          .then(this.checkAuth())
          .then(() => {
            return Promise.resolve()
              .then(this.Helpers.hideLoader())
              .then(this.welcome());
          })
          .catch(() => {
            return Promise.resolve()
              .then(this.Helpers.hideLoader())
              .then(this.login());
          })
          .catch(this.run());
      };
    }
    checkAuth() {
      return () => {
        return Promise.resolve()
          .then(this.Helpers.showLoader())
          .then(() => {
            return this.AuthActions.checkAuth();
          });
      };
    }
    welcome() {
      return (payload) => {
        let message = {
          text: this.$l('WELCOME') + payload
        };
        return this.ChatActions.newMessage(message);
      };
    }
    login() {
      return () => {
        let keyboard = this.getKeyboard(),
            conversation = this.getConversation(),
            stage = {
              keyboard: keyboard,
              conversation: conversation
            };
        return this.ChatActions.newStage(stage);
      };
    }
    getConversation() {
      let req = [this.$l('CHOOSE_LOGIN_PROVIDER')],
          resResolve = [{
            text: this.$l('LOGIN_SUCCESSFUL'),
            payload: true
          }],
          resReject = [this.$l('LOGIN_FAILED')],
          conversation = this.StageHelper.getConversation(
            req,
            resResolve,
            resReject
          );
      return conversation;
    }
    getKeyboard() {
      let options = [],
          keyboard = {
            actionProvider: 'Auth',
            action: 'login',
            options: options,
            type: 'BUBBLES'
          };
      angular.forEach(['FACEBOOK', 'EMAIL'], (value) => {
        options.push({
          data: {
            provider: value
          },
          message: {
            text: this.$l(`LOGIN_WITH_${value}`)
          }
        });
      });
      return keyboard;
    }
  }
  angular
    .module('gruu.logic.orchestrator')
    .service('AuthOrchestrator', Service)
    .constant('AuthLabels', {
      LOGIN_WITH_FACEBOOK: {
        en: 'Login with Facebook'
      },
      LOGIN_WITH_EMAIL: {
        en: 'Login with Email and Password'
      },
      CHOOSE_LOGIN_PROVIDER: {
        en: 'Please login with any of the following options'
      },
      LOGIN_SUCCESSFUL: {
        en: 'Hi '
      },
      LOGIN_FAILED: {
        en: 'Login Failed. Please try again.'
      },
      WELCOME: {
        en: 'Hi '
      }
    });
}());
