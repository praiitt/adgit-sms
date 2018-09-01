(function () {
  'use strict';

  angular
    .module('attaindancemanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('attaindancemanagements', {
        abstract: true,
        url: '/attaindancemanagements',
        template: '<ui-view/>'
      })
      .state('attaindancemanagements.list', {
        url: '',
        templateUrl: 'modules/attaindancemanagements/client/views/list-attaindancemanagements.client.view.html',
        controller: 'AttaindancemanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Attaindancemanagements List'
        }
      })
      .state('attaindancemanagements.create', {
        url: '/create',
        templateUrl: 'modules/attaindancemanagements/client/views/form-attaindancemanagement.client.view.html',
        controller: 'AttaindancemanagementsController',
        controllerAs: 'vm',
        resolve: {
          attaindancemanagementResolve: newAttaindancemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Attaindancemanagements Create'
        }
      })
      .state('attaindancemanagements.edit', {
        url: '/:attaindancemanagementId/edit',
        templateUrl: 'modules/attaindancemanagements/client/views/form-attaindancemanagement.client.view.html',
        controller: 'AttaindancemanagementsController',
        controllerAs: 'vm',
        resolve: {
          attaindancemanagementResolve: getAttaindancemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Attaindancemanagement {{ attaindancemanagementResolve.name }}'
        }
      })
      .state('attaindancemanagements.view', {
        url: '/:attaindancemanagementId',
        templateUrl: 'modules/attaindancemanagements/client/views/view-attaindancemanagement.client.view.html',
        controller: 'AttaindancemanagementsController',
        controllerAs: 'vm',
        resolve: {
          attaindancemanagementResolve: getAttaindancemanagement
        },
        data: {
          pageTitle: 'Attaindancemanagement {{ attaindancemanagementResolve.name }}'
        }
      });
  }

  getAttaindancemanagement.$inject = ['$stateParams', 'AttaindancemanagementsService'];

  function getAttaindancemanagement($stateParams, AttaindancemanagementsService) {
    return AttaindancemanagementsService.get({
      attaindancemanagementId: $stateParams.attaindancemanagementId
    }).$promise;
  }

  newAttaindancemanagement.$inject = ['AttaindancemanagementsService'];

  function newAttaindancemanagement(AttaindancemanagementsService) {
    return new AttaindancemanagementsService();
  }
}());
