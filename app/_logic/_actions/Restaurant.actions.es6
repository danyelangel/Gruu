(function () {
  'use strict';

  class Service {
    constructor($timeout, Store, RestaurantLabels, Lang) {
      this.$timeout = $timeout;
      this.Store = Store;
      this.Labels = RestaurantLabels;
      this.Lang = Lang.lang;
    }
    getList() {
      let list = [
          {
            $key: 'ploap',
            category: 'ITALIAN',
            rating: 4.5,
            title: 'Harry Sasson',
            price: 59000,
            address: 'Cr54D # 134 - 21',
            schedule: {
              ALL: {
                open: 7.5,
                close: 20.5
              },
              5: {
                open: 7.5,
                close: 19.5
              }
            },
            flags: ['WIFI', 'PARKING', 'PICKUP'],
            isOpen: true,
            image: {
              imageSrc: 'http://3.bp.blogspot.com/-8s5aS1f_6ag/TfQnGu4QfTI/AAAAAAAADm8/dUVMCvJUrfs/s1600/logo+copia+HARRY+SASSON.png'
            }
          },
          {
            $key: 'ploap',
            category: 'ITALIAN',
            rating: 4.3,
            title: 'Crepes & Waffles',
            price: 39000,
            address: 'Cr54D # 134 - 21',
            schedule: {
              ALL: {
                open: 7.5,
                close: 20.5
              },
              5: {
                open: 7.5,
                close: 19.5
              }
            },
            flags: ['WIFI', 'PICKUP'],
            isOpen: true,
            image: {
              imageSrc: 'https://res.cloudinary.com/civico/image/upload/c_fit,f_auto,fl_lossy,h_1200,w_1200/v1/entity/image/file/0a7/000/52d5a85731e93c6e260000a7.jpg'
            }
          },
          {
            $key: 'ploap',
            category: 'ITALIAN',
            rating: 3.5,
            title: 'El Corral',
            price: 5000,
            address: 'Cr54D # 134 - 21',
            schedule: {
              ALL: {
                open: 7.5,
                close: 20.5
              },
              5: {
                open: 7.5,
                close: 19.5
              }
            },
            flags: ['WIFI', 'PARKING'],
            isOpen: false,
            image: {
              imageSrc: 'http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/122010/corral.png?itok=nB7Vr48v'
            }
          },
          {
            $key: 'ploap',
            category: 'BAR',
            rating: 3.8,
            title: 'Bogota Beer Company LTDA',
            price: 35000,
            address: 'Cr54D # 134 - 21',
            schedule: {
              ALL: {
                open: 7.5,
                close: 20.5
              },
              5: {
                open: 7.5,
                close: 19.5
              }
            },
            flags: ['PICKUP'],
            isOpen: false,
            image: {
              imageSrc: 'http://bogotabeercompany.com/wp-content/uploads/2014/10/LOGO.png'
            }
          },
          {
            $key: 'ploap',
            category: 'BAR',
            rating: 4.0,
            title: 'Harry Sasson',
            price: 29000,
            address: 'Cr54D # 134 - 21',
            schedule: {
              ALL: {
                open: 7.5,
                close: 20.5
              },
              5: {
                open: 7.5,
                close: 19.5
              }
            },
            flags: ['WIFI', 'PICKUP'],
            isOpen: true,
            image: {
              imageSrc: 'http://3.bp.blogspot.com/-8s5aS1f_6ag/TfQnGu4QfTI/AAAAAAAADm8/dUVMCvJUrfs/s1600/logo+copia+HARRY+SASSON.png'
            }
          }
      ];
      return new Promise(resolve => {
        this.$timeout(() => {
          this.Store.dispatch({
            type: 'RESTAURANT.RECEIVE',
            data: list,
            labels: this.Labels,
            lang: this.Lang
          });
          resolve();
        }, 500);
      });
    }
    choose(data) {
      return new Promise(resolve => {
        this.Store.dispatch({
          type: 'RESTAURANT.CHOOSE',
          data: data
        });
        resolve();
      });
    }
  }
  angular
    .module('gruu.logic.actions')
    .service('RestaurantActions', Service);
}());
