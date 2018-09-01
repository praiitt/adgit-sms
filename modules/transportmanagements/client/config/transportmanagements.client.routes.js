(function () {
  'use strict';

  angular
    .module('transportmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('transportmanagements', {
        abstract: true,
        url: '/transportmanagements',
        template: '<ui-view/>'
      })
      .state('transportmanagements.list', {
        url: '',
        templateUrl: 'modules/transportmanagements/client/views/list-transportmanagements.client.view.html',
        controller: 'TransportmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Transportmanagements List'
        }
      })
      .state('transportmanagements.create', {
        url: '/create',
        templateUrl: 'modules/transportmanagements/client/views/form-transportmanagement.client.view.html',
        controller: 'TransportmanagementsController',
        controllerAs: 'vm',
        resolve: {
          transportmanagementResolve: newTransportmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Transportmanagements Create'
        }
      })
      .state('transportmanagements.edit', {
        url: '/:transportmanagementId/edit',
        templateUrl: 'modules/transportmanagements/client/views/form-transportmanagement.client.view.html',
        controller: 'TransportmanagementsController',
        controllerAs: 'vm',
        resolve: {
          transportmanagementResolve: getTransportmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Transportmanagement {{ transportmanagementResolve.name }}'
        }
      })
      .state('transportmanagements.view', {
        url: '/:transportmanagementId',
        templateUrl: 'modules/transportmanagements/client/views/view-transportmanagement.client.view.html',
        controller: 'TransportmanagementsController',
        controllerAs: 'vm',
        resolve: {
          transportmanagementResolve: getTransportmanagement
        },
        data: {
          pageTitle: 'Transportmanagement {{ transportmanagementResolve.name }}'
        }
      });
  }

  getTransportmanagement.$inject = ['$stateParams', 'TransportmanagementsService'];

  function getTransportmanagement($stateParams, TransportmanagementsService) {
    return TransportmanagementsService.get({
      transportmanagementId: $stateParams.transportmanagementId
    }).$promise;
  }

  newTransportmanagement.$inject = ['TransportmanagementsService'];

  function newTransportmanagement(TransportmanagementsService) {
    return new TransportmanagementsService();
  }
}());
