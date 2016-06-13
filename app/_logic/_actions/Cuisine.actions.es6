(function () {
  'use strict';

  class Service {
    constructor($timeout, Store) {
      this.$timeout = $timeout;
      this.Store = Store;
    }
    getCuisines() {
      let cuisines = [
          {
            $key: 'ploap',
            title: 'International',
            image: {
              imageSrc: 'http://cdn-img.health.com/sites/default/files/migration/img/web/2012/07/slides/super-foods-400x400.jpg'
            }
          },
          {
            $key: 'ploap',
            title: 'Popis',
            image: {
              imageSrc: 'http://cdn-img.health.com/sites/default/files/migration/img/web/2012/07/slides/super-foods-400x400.jpg'
            }
          },
          {
            $key: 'ploap',
            title: 'Local',
            image: {
              imageSrc: 'http://cdn-img.health.com/sites/default/files/migration/img/web/2012/07/slides/super-foods-400x400.jpg'
            }
          },
          {
            $key: 'ploap',
            title: 'Popis',
            image: {
              imageSrc: 'http://cdn-img.health.com/sites/default/files/migration/img/web/2012/07/slides/super-foods-400x400.jpg'
            }
          },
          {
            $key: 'ploap',
            title: 'Local',
            image: {
              imageSrc: 'http://cdn-img.health.com/sites/default/files/migration/img/web/2012/07/slides/super-foods-400x400.jpg'
            }
          }
      ];
      return new Promise(resolve => {
        this.$timeout(() => {
          this.Store.dispatch({
            type: 'RECEIVE_CUISINES',
            cuisines: cuisines
          });
          resolve();
        }, 500);
      });
    }
    choose(cuisine) {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'CHOOSE_CUISINE',
          cuisine: cuisine
        });
        resolve();
      });
    }
  }
  angular
    .module('gruu.logic.actions')
    .service('CuisineActions', Service);
}());
