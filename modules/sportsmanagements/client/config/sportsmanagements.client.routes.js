(function () {
  'use strict';

  angular
    .module('sportsmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('sportsmanagements', {
        abstract: true,
        url: '/sportsmanagements',
        template: '<ui-view/>'
      })
      .state('sportsmanagements.list', {
        url: '',
        templateUrl: 'modules/sportsmanagements/client/views/list-sportsmanagements.client.view.html',
        controller: 'SportsmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Sportsmanagements List'
        }
      })
      .state('sportsmanagements.create', {
        url: '/create',
        templateUrl: 'modules/sportsmanagements/client/views/form-sportsmanagement.client.view.html',
        controller: 'SportsmanagementsController',
        controllerAs: 'vm',
        resolve: {
          sportsmanagementResolve: newSportsmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Sportsmanagements Create'
        }
      })
      .state('sportsmanagements.edit', {
        url: '/:sportsmanagementId/edit',
        templateUrl: 'modules/sportsmanagements/client/views/form-sportsmanagement.client.view.html',
        controller: 'SportsmanagementsController',
        controllerAs: 'vm',
        resolve: {
          sportsmanagementResolve: getSportsmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Sportsmanagement {{ sportsmanagementResolve.name }}'
        }
      })
      .state('sportsmanagements.view', {
        url: '/:sportsmanagementId',
        templateUrl: 'modules/sportsmanagements/client/views/view-sportsmanagement.client.view.html',
        controller: 'SportsmanagementsController',
        controllerAs: 'vm',
        resolve: {
          sportsmanagementResolve: getSportsmanagement
        },
        data: {
          pageTitle: 'Sportsmanagement {{ sportsmanagementResolve.name }}'
        }
      });
  }

  getSportsmanagement.$inject = ['$stateParams', 'SportsmanagementsService'];

  function getSportsmanagement($stateParams, SportsmanagementsService) {
    return SportsmanagementsService.get({
      sportsmanagementId: $stateParams.sportsmanagementId
    }).$promise;
  }

  newSportsmanagement.$inject = ['SportsmanagementsService'];

  function newSportsmanagement(SportsmanagementsService) {
    return new SportsmanagementsService();
  }
}());
