(function () {
  'use strict';

  angular
    .module('routinemanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('routinemanagements', {
        abstract: true,
        url: '/routinemanagements',
        template: '<ui-view/>'
      })
      .state('routinemanagements.list', {
        url: '',
        templateUrl: 'modules/routinemanagements/client/views/list-routinemanagements.client.view.html',
        controller: 'RoutinemanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Routinemanagements List'
        }
      })
      .state('routinemanagements.create', {
        url: '/create',
        templateUrl: 'modules/routinemanagements/client/views/form-routinemanagement.client.view.html',
        controller: 'RoutinemanagementsController',
        controllerAs: 'vm',
        resolve: {
          routinemanagementResolve: newRoutinemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Routinemanagements Create'
        }
      })
      .state('routinemanagements.edit', {
        url: '/:routinemanagementId/edit',
        templateUrl: 'modules/routinemanagements/client/views/form-routinemanagement.client.view.html',
        controller: 'RoutinemanagementsController',
        controllerAs: 'vm',
        resolve: {
          routinemanagementResolve: getRoutinemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Routinemanagement {{ routinemanagementResolve.name }}'
        }
      })
      .state('routinemanagements.view', {
        url: '/:routinemanagementId',
        templateUrl: 'modules/routinemanagements/client/views/view-routinemanagement.client.view.html',
        controller: 'RoutinemanagementsController',
        controllerAs: 'vm',
        resolve: {
          routinemanagementResolve: getRoutinemanagement
        },
        data: {
          pageTitle: 'Routinemanagement {{ routinemanagementResolve.name }}'
        }
      });
  }

  getRoutinemanagement.$inject = ['$stateParams', 'RoutinemanagementsService'];

  function getRoutinemanagement($stateParams, RoutinemanagementsService) {
    return RoutinemanagementsService.get({
      routinemanagementId: $stateParams.routinemanagementId
    }).$promise;
  }

  newRoutinemanagement.$inject = ['RoutinemanagementsService'];

  function newRoutinemanagement(RoutinemanagementsService) {
    return new RoutinemanagementsService();
  }
}());
