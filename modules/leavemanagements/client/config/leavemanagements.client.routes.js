(function () {
  'use strict';

  angular
    .module('leavemanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('leavemanagements', {
        abstract: true,
        url: '/leavemanagements',
        template: '<ui-view/>'
      })
      .state('leavemanagements.list', {
        url: '',
        templateUrl: 'modules/leavemanagements/client/views/list-leavemanagements.client.view.html',
        controller: 'LeavemanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Leavemanagements List'
        }
      })
      .state('leavemanagements.create', {
        url: '/create',
        templateUrl: 'modules/leavemanagements/client/views/form-leavemanagement.client.view.html',
        controller: 'LeavemanagementsController',
        controllerAs: 'vm',
        resolve: {
          leavemanagementResolve: newLeavemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Leavemanagements Create'
        }
      })
      .state('leavemanagements.edit', {
        url: '/:leavemanagementId/edit',
        templateUrl: 'modules/leavemanagements/client/views/form-leavemanagement.client.view.html',
        controller: 'LeavemanagementsController',
        controllerAs: 'vm',
        resolve: {
          leavemanagementResolve: getLeavemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Leavemanagement {{ leavemanagementResolve.name }}'
        }
      })
      .state('leavemanagements.view', {
        url: '/:leavemanagementId',
        templateUrl: 'modules/leavemanagements/client/views/view-leavemanagement.client.view.html',
        controller: 'LeavemanagementsController',
        controllerAs: 'vm',
        resolve: {
          leavemanagementResolve: getLeavemanagement
        },
        data: {
          pageTitle: 'Leavemanagement {{ leavemanagementResolve.name }}'
        }
      });
  }

  getLeavemanagement.$inject = ['$stateParams', 'LeavemanagementsService'];

  function getLeavemanagement($stateParams, LeavemanagementsService) {
    return LeavemanagementsService.get({
      leavemanagementId: $stateParams.leavemanagementId
    }).$promise;
  }

  newLeavemanagement.$inject = ['LeavemanagementsService'];

  function newLeavemanagement(LeavemanagementsService) {
    return new LeavemanagementsService();
  }
}());
