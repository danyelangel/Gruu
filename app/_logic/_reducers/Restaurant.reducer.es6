(function () {
  'use strict';
  class Service {
    reducer() {
      let self = this;
      return function (state = {}, action = {}) {
        return {
          restaurants: self.restaurantsReducer(state.restaurants, action),
          keyboard: self.keyboardReducer(state.keyboard, action),
          selected: self.selectedReducer(state.selected, action)
        };
      };
    }
    restaurantsReducer(state, action) {
      switch (action.type) {
        case 'RESTAURANT.RECEIVE':
          return action.data;
        default:
          return state;
      }
    }
    keyboardReducer(state = {}, action = {}) {
      switch (action.type) {
        case 'RESTAURANT.RECEIVE':
          return {
            type: 'LIST',
            actionProvider: 'Restaurant',
            action: 'choose',
            title: this.label('RESTAURANTS', action),
            filter: {
              flags: this.parseFilter(['WIFI', 'PARKING', 'PICKUP'], action),
              sort: this.parseFilter(['RATING'], action, ['PRICE']),
              defaultSort: 'RATING'
            },
            options: this.parseOptions(action.data, action)
          };
        default:
          return state;
      }
    }
    selectedReducer(state = {}, action = {}) {
      switch (action.type) {
        case 'RESTAURANT.RECEIVE':
          return {
            restaurants: action.data,
            keyboard: this.keyboardReducer(state.keyboard, action),
            selected: state.selected
          };
        case 'RESTAURANT.CHOOSE':
          return {
            restaurants: state.restaurants,
            keyboard: state.keyboard,
            selected: action.data
          };
        default:
          return state;
      }
    }
    // Utility Functions
    label(text, action) {
      let lang = action.lang,
          labels = action.labels;
      return labels[text][lang];
    }
    parseFilter(items, action, reversable) {
      let filter = {};
      angular.forEach(items, (value) => {
        filter[value] = {
          text: this.label(value, action)
        };
      });
      angular.forEach(reversable, (value) => {
        filter[value] = {
          text: this.label(value, action),
          reversable: true
        };
      });
      return filter;
    }
    parseOptions(data, action) {
      let options = [];
      angular.forEach(data, (value, key) => {
        options.push(this.parseOption(value, key, action));
      });
      return options;
    }
    parseOption(value, key, action) {
      return {
        data: {
          index: key,
          key: value.$key
        },
        message: {
          image: value.image,
          title: value.title,
          subtitles: [
            value.address,
            this.textTimes(value.schedule),
            this.textPrice(value.price)
          ],
          flags: this.textFlags(value.flags, action),
          status: value.isOpen
        },
        category: value.category,
        flags: value.flags,
        RATING: value.rating,
        PRICE: value.price
      };
    }
    textPrice(price) {
      return `~ $${Math.floor(price / 1000)}K`;
    }
    textFlags(flags, action) {
      let textFlags = [];
      angular.forEach(flags, (value, key) => {
        textFlags[key] = this.label(value, action);
      });
      return textFlags;
    }
    textHours(hours) {
      let openMins = (hours.open % 1).toFixed(2) * 60,
          closeMins = (hours.open % 1).toFixed(2) * 60,
          openMinsText = Math.round(openMins),
          closeMinsText = Math.round(closeMins),
          openHours = Math.floor(hours.open),
          closeHours = Math.floor(hours.close),
          hoursText = `${openHours}:${openMinsText} - ${closeHours}:${closeMinsText}`;
      return hoursText;
    }
    textTimes(schedule) {
      let today = new Date(),
          weekday = today.getDay(),
          times;
      if (schedule[weekday]) {
        times = this.textHours(schedule[weekday]);
      } else {
        times = this.textHours(schedule.ALL);
      }
      return times;
    }
  }
  angular
    .module('gruu.logic.reducers')
    .service('RestaurantReducer', Service);
}());
