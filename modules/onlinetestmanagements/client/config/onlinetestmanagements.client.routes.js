(function () {
  'use strict';

  angular
    .module('onlinetestmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('onlinetestmanagements', {
        abstract: true,
        url: '/onlinetestmanagements',
        template: '<ui-view/>'
      })
      .state('onlinetestmanagements.list', {
        url: '',
        templateUrl: 'modules/onlinetestmanagements/client/views/list-onlinetestmanagements.client.view.html',
        controller: 'OnlinetestmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Onlinetestmanagements List'
        }
      })
      .state('onlinetestmanagements.create', {
        url: '/create',
        templateUrl: 'modules/onlinetestmanagements/client/views/form-onlinetestmanagement.client.view.html',
        controller: 'OnlinetestmanagementsController',
        controllerAs: 'vm',
        resolve: {
          onlinetestmanagementResolve: newOnlinetestmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Onlinetestmanagements Create'
        }
      })
      .state('onlinetestmanagements.edit', {
        url: '/:onlinetestmanagementId/edit',
        templateUrl: 'modules/onlinetestmanagements/client/views/form-onlinetestmanagement.client.view.html',
        controller: 'OnlinetestmanagementsController',
        controllerAs: 'vm',
        resolve: {
          onlinetestmanagementResolve: getOnlinetestmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Onlinetestmanagement {{ onlinetestmanagementResolve.name }}'
        }
      })
      .state('onlinetestmanagements.view', {
        url: '/:onlinetestmanagementId',
        templateUrl: 'modules/onlinetestmanagements/client/views/view-onlinetestmanagement.client.view.html',
        controller: 'OnlinetestmanagementsController',
        controllerAs: 'vm',
        resolve: {
          onlinetestmanagementResolve: getOnlinetestmanagement
        },
        data: {
          pageTitle: 'Onlinetestmanagement {{ onlinetestmanagementResolve.name }}'
        }
      });
  }

  getOnlinetestmanagement.$inject = ['$stateParams', 'OnlinetestmanagementsService'];

  function getOnlinetestmanagement($stateParams, OnlinetestmanagementsService) {
    return OnlinetestmanagementsService.get({
      onlinetestmanagementId: $stateParams.onlinetestmanagementId
    }).$promise;
  }

  newOnlinetestmanagement.$inject = ['OnlinetestmanagementsService'];

  function newOnlinetestmanagement(OnlinetestmanagementsService) {
    return new OnlinetestmanagementsService();
  }
}());
