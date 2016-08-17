(function () {
  'use strict';
  class Service {
    constructor(ChatActions, ReservationLabels, Label, ReservationActions, ChatHelper, Store, OrchestratorHelpers) {
      this.ChatActions = ChatActions;
      this.ReservationActions = ReservationActions;
      this.Helpers = OrchestratorHelpers;
      this.StageHelper = ChatHelper.stage();
      this.Store = Store;
      this.$l = Label.$l(ReservationLabels);
    }
    runPeople() {
      return (position) => {
        console.groupEnd();
        console.group('RESERVATION_PEOPLE');
        return Promise.resolve()
          .then(this.choosePeople(position));
      };
    }
    runDate() {
      return (position) => {
        console.groupEnd();
        console.group('RESERVATION_DATE');
        return Promise.resolve()
          .then(this.chooseDate(position))
          .then(this.chooseDatepicker(position));
      };
    }
    runTime() {
      return (position) => {
        console.groupEnd();
        console.group('RESERVATION_TIME');
        return Promise.resolve()
          .then(this.Helpers.showLoader())
          .then(this.getTimes())
          .then(this.Helpers.hideLoader())
          .then(this.chooseTime())
          .then(this.makeReservation(position));
      };
    }
    // People
    choosePeople(processPosition) {
      function getOption(number) {
        return {
          data: number,
          message: {
            text: number.toString()
          }
        };
      }
      return () => {
        let options = [],
            keyboard = {
              actionProvider: 'Reservation',
              action: 'choosePeople',
              options: options,
              type: 'BUBBLES_SCROLL'
            },
            conversation = this.getPeopleConversation(processPosition),
            stage = {
              keyboard: keyboard,
              conversation: conversation
            };
        for (let i = 1; i <= 8; i++) {
          options[i - 1] = getOption(i);
        }
        return this.ChatActions.newStage(stage);
      };
    }
    getPeopleConversation(processPosition) {
      let req = [this.$l('CHOOSE_PEOPLE')],
          resResolve = [],
          resReject = [this.$l('CHOOSE_PEOPLE_FAILED')],
          regress = {
            text: this.$l('CHOOSE_PEOPLE_AGAIN'),
            processPosition: processPosition
          },
          conversation = this.StageHelper.getConversation(
            req,
            resResolve,
            resReject,
            regress
          );
      return conversation;
    }
    // Date
    chooseDate(processPosition) {
      function getDate(date, isTomorrow) {
        let dd = date.getDate(),
            mm = date.getMonth() + 1,
            yyyy = date.getFullYear();
        if (isTomorrow) {
          dd++;
        }
        return new Date(yyyy, mm, dd);
      }
      return () => {
        let options = [
            {
              data: getDate(new Date()),
              message: {
                text: 'Today'
              }
            },
            {
              data: getDate(new Date(), true),
              message: {
                text: 'Tomorrow'
              }
            }
            ],
            keyboard = {
              actionProvider: 'Reservation',
              action: 'chooseDate',
              options: options,
              cancelOption: {
                text: 'Other'
              },
              type: 'BUBBLES'
            },
            conversation = this.getDateConversation(processPosition),
            stage = {
              keyboard: keyboard,
              conversation: conversation
            };
        this.Store.dispatch({
          type: 'RESERVATION.RESET_DATE'
        });
        return this.ChatActions.newStage(stage);
      };
    }
    chooseDatepicker(processPosition) {
      let promise = Promise.resolve();
      return () => {
        let keyboard = {
              actionProvider: 'Reservation',
              action: 'chooseDate',
              type: 'DATEPICKER'
            },
            conversation = this.getDateConversation(processPosition),
            stage = {
              keyboard: keyboard,
              conversation: conversation
            };
        if (!angular.isDate(this.Store.state.reservation.reservation.date)) {
          promise = this.ChatActions.newStage(stage);
        }
        return promise;
      };
    }
    getDateConversation(processPosition) {
      let req = [this.$l('CHOOSE_DATE')],
          resResolve = [],
          resReject = [this.$l('CHOOSE_DATE_FAILED')],
          regress = {
            text: this.$l('CHOOSE_DATE_AGAIN'),
            processPosition: processPosition
          },
          conversation = this.StageHelper.getConversation(
            req,
            resResolve,
            resReject,
            regress
          );
      return conversation;
    }
    // Time
    getTimes() {
      let date;
      return () => {
        date = this.Store.state.reservation.reservation.date;
        return this.ReservationActions
          .getTimes(date);
      };
    }
    chooseTime(processPosition) {
      return () => {
        let conversation = this.getTimesConversation(processPosition),
            keyboard = this.Store.state.reservation.timesKeyboard,
            stage = {
              keyboard: keyboard,
              conversation: conversation
            };
        return this.ChatActions.newStage(stage);
      };
    }
    getTimesConversation(processPosition) {
      let req = [this.$l('CHOOSE_TIME')],
          resResolve = [],
          resReject = [this.$l('CHOOSE_TIME_FAILED')],
          regress = {
            text: this.$l('CHOOSE_TIME_AGAIN'),
            processPosition: processPosition
          },
          conversation = this.StageHelper.getConversation(
            req,
            resResolve,
            resReject,
            regress
          );
      return conversation;
    }
    // Reservation
    makeReservation() {
      return () => {
        return Promise.resolve();
      };
    }
  }
  angular
    .module('gruu.logic.orchestrator')
    .service('ReservationOrchestrator', Service)
    .constant('ReservationLabels', {
      CHOOSE_PEOPLE: {
        en: 'How many people do you want to reserve for?'
      },
      CHOOSE_PEOPLE_FAILED: {
        en: 'Couldn\'t choose people. Please try again.'
      },
      CHOOSE_PEOPLE_AGAIN: {
        en: 'Change'
      },
      CHOOSE_DATE: {
        en: 'For which date?'
      },
      CHOOSE_DATE_AGAIN: {
        en: 'Change date'
      },
      CHOOSE_DATE_FAILED: {
        en: 'Couldn\'t choose date. Please try again.'
      },
      CHOOSE_TIME: {
        en: 'At what time?'
      },
      CHOOSE_TIME_FAILED: {
        en: 'Couldn\'t choose time. Please try again.'
      },
      CHOOSE_TIME_AGAIN: {
        en: 'Change time'
      }
    });
}());
