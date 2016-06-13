(function () {
  'use strict';

  class Service {
    constructor($timeout, Store) {
      this.$timeout = $timeout;
      this.Store = Store;
    }
    getList() {
      let list = [
          {
            $key: 'ploap',
            title: 'Harry Sasson',
            price: 'HIGH',
            address: 'Cr54D # 134 - 21',
            isOpen: true,
            image: {
              imageSrc: 'http://3.bp.blogspot.com/-8s5aS1f_6ag/TfQnGu4QfTI/AAAAAAAADm8/dUVMCvJUrfs/s1600/logo+copia+HARRY+SASSON.png'
            }
          },
          {
            $key: 'ploap',
            title: 'Crepes & Waffles',
            price: 'HIGH',
            address: 'Cr54D # 134 - 21',
            isOpen: true,
            image: {
              imageSrc: 'https://res.cloudinary.com/civico/image/upload/c_fit,f_auto,fl_lossy,h_1200,w_1200/v1/entity/image/file/0a7/000/52d5a85731e93c6e260000a7.jpg'
            }
          },
          {
            $key: 'ploap',
            title: 'El Corral',
            price: 'HIGH',
            address: 'Cr54D # 134 - 21',
            isOpen: true,
            image: {
              imageSrc: 'http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/122010/corral.png?itok=nB7Vr48v'
            }
          },
          {
            $key: 'ploap',
            title: 'Bogota Beer Company LTDA',
            price: 'HIGH',
            address: 'Cr54D # 134 - 21',
            isOpen: true,
            image: {
              imageSrc: 'http://bogotabeercompany.com/wp-content/uploads/2014/10/LOGO.png'
            }
          },
          {
            $key: 'ploap',
            title: 'Harry Sasson',
            price: 'HIGH',
            address: 'Cr54D # 134 - 21',
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
            data: list
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
