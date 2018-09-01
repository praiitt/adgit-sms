(function () {
  'use strict';

  angular
    .module('studentmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('studentmanagements', {
        abstract: true,
        url: '/studentmanagements',
        template: '<ui-view/>'
      })
      .state('studentmanagements.list', {
        url: '',
        templateUrl: 'modules/studentmanagements/client/views/list-studentmanagements.client.view.html',
        controller: 'StudentmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Studentmanagements List'
        }
      })
      .state('studentmanagements.create', {
        url: '/create',
        templateUrl: 'modules/studentmanagements/client/views/form-studentmanagement.client.view.html',
        controller: 'StudentmanagementsController',
        controllerAs: 'vm',
        resolve: {
          studentmanagementResolve: newStudentmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Studentmanagements Create'
        }
      })
      .state('studentmanagements.edit', {
        url: '/:studentmanagementId/edit',
        templateUrl: 'modules/studentmanagements/client/views/form-studentmanagement.client.view.html',
        controller: 'StudentmanagementsController',
        controllerAs: 'vm',
        resolve: {
          studentmanagementResolve: getStudentmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Studentmanagement {{ studentmanagementResolve.name }}'
        }
      })
      .state('studentmanagements.view', {
        url: '/:studentmanagementId',
        templateUrl: 'modules/studentmanagements/client/views/view-studentmanagement.client.view.html',
        controller: 'StudentmanagementsController',
        controllerAs: 'vm',
        resolve: {
          studentmanagementResolve: getStudentmanagement
        },
        data: {
          pageTitle: 'Studentmanagement {{ studentmanagementResolve.name }}'
        }
      });
  }

  getStudentmanagement.$inject = ['$stateParams', 'StudentmanagementsService'];

  function getStudentmanagement($stateParams, StudentmanagementsService) {
    return StudentmanagementsService.get({
      studentmanagementId: $stateParams.studentmanagementId
    }).$promise;
  }

  newStudentmanagement.$inject = ['StudentmanagementsService'];

  function newStudentmanagement(StudentmanagementsService) {
    return new StudentmanagementsService();
  }
}());
