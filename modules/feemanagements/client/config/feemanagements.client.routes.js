(function () {
  'use strict';

  angular
    .module('feemanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('feemanagements', {
        abstract: true,
        url: '/feemanagements',
        template: '<ui-view/>'
      })
      .state('feemanagements.list', {
        url: '',
        templateUrl: 'modules/feemanagements/client/views/list-feemanagements.client.view.html',
        controller: 'FeemanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Feemanagements List'
        }
      })
      .state('feemanagements.create', {
        url: '/create',
        templateUrl: 'modules/feemanagements/client/views/form-feemanagement.client.view.html',
        controller: 'FeemanagementsController',
        controllerAs: 'vm',
        resolve: {
          feemanagementResolve: newFeemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Feemanagements Create'
        }
      })
      .state('feemanagements.edit', {
        url: '/:feemanagementId/edit',
        templateUrl: 'modules/feemanagements/client/views/form-feemanagement.client.view.html',
        controller: 'FeemanagementsController',
        controllerAs: 'vm',
        resolve: {
          feemanagementResolve: getFeemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Feemanagement {{ feemanagementResolve.name }}'
        }
      })
      .state('feemanagements.view', {
        url: '/:feemanagementId',
        templateUrl: 'modules/feemanagements/client/views/view-feemanagement.client.view.html',
        controller: 'FeemanagementsController',
        controllerAs: 'vm',
        resolve: {
          feemanagementResolve: getFeemanagement
        },
        data: {
          pageTitle: 'Feemanagement {{ feemanagementResolve.name }}'
        }
      });
  }

  getFeemanagement.$inject = ['$stateParams', 'FeemanagementsService'];

  function getFeemanagement($stateParams, FeemanagementsService) {
    return FeemanagementsService.get({
      feemanagementId: $stateParams.feemanagementId
    }).$promise;
  }

  newFeemanagement.$inject = ['FeemanagementsService'];

  function newFeemanagement(FeemanagementsService) {
    return new FeemanagementsService();
  }
}());
