(function () {
  'use strict';

  angular
    .module('teacher-staffmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teacher-staffmanagements', {
        abstract: true,
        url: '/teacher-staffmanagements',
        template: '<ui-view/>'
      })
      .state('teacher-staffmanagements.list', {
        url: '',
        templateUrl: 'modules/teacher-staffmanagements/client/views/list-teacher-staffmanagements.client.view.html',
        controller: 'TeacherStaffmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Teacher staffmanagements List'
        }
      })
      .state('teacher-staffmanagements.create', {
        url: '/create',
        templateUrl: 'modules/teacher-staffmanagements/client/views/form-teacher-staffmanagement.client.view.html',
        controller: 'TeacherStaffmanagementsController',
        controllerAs: 'vm',
        resolve: {
          teacher-staffmanagementResolve: newTeacherStaffmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Teacher staffmanagements Create'
        }
      })
      .state('teacher-staffmanagements.edit', {
        url: '/:teacherStaffmanagementId/edit',
        templateUrl: 'modules/teacher-staffmanagements/client/views/form-teacher-staffmanagement.client.view.html',
        controller: 'TeacherStaffmanagementsController',
        controllerAs: 'vm',
        resolve: {
          teacher-staffmanagementResolve: getTeacherStaffmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Teacher staffmanagement {{ teacher-staffmanagementResolve.name }}'
        }
      })
      .state('teacher-staffmanagements.view', {
        url: '/:teacherStaffmanagementId',
        templateUrl: 'modules/teacher-staffmanagements/client/views/view-teacher-staffmanagement.client.view.html',
        controller: 'TeacherStaffmanagementsController',
        controllerAs: 'vm',
        resolve: {
          teacher-staffmanagementResolve: getTeacherStaffmanagement
        },
        data: {
          pageTitle: 'Teacher staffmanagement {{ teacher-staffmanagementResolve.name }}'
        }
      });
  }

  getTeacherStaffmanagement.$inject = ['$stateParams', 'TeacherStaffmanagementsService'];

  function getTeacherStaffmanagement($stateParams, TeacherStaffmanagementsService) {
    return TeacherStaffmanagementsService.get({
      teacherStaffmanagementId: $stateParams.teacherStaffmanagementId
    }).$promise;
  }

  newTeacherStaffmanagement.$inject = ['TeacherStaffmanagementsService'];

  function newTeacherStaffmanagement(TeacherStaffmanagementsService) {
    return new TeacherStaffmanagementsService();
  }
}());
