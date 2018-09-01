(function () {
  'use strict';

  angular
    .module('attendancemanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('attendancemanagements', {
        abstract: true,
        url: '/attendancemanagements',
        template: '<ui-view/>'
      })
      .state('attendancemanagements.list', {
        url: '',
        templateUrl: 'modules/attendancemanagements/client/views/list-attendancemanagements.client.view.html',
        controller: 'AttendancemanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Attendancemanagements List'
        }
      })
      .state('attendancemanagements.create', {
        url: '/create',
        templateUrl: 'modules/attendancemanagements/client/views/form-attendancemanagement.client.view.html',
        controller: 'AttendancemanagementsController',
        controllerAs: 'vm',
        resolve: {
          attendancemanagementResolve: newAttendancemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Attendancemanagements Create'
        }
      })
      .state('attendancemanagements.edit', {
        url: '/:attendancemanagementId/edit',
        templateUrl: 'modules/attendancemanagements/client/views/form-attendancemanagement.client.view.html',
        controller: 'AttendancemanagementsController',
        controllerAs: 'vm',
        resolve: {
          attendancemanagementResolve: getAttendancemanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Attendancemanagement {{ attendancemanagementResolve.name }}'
        }
      })
      .state('attendancemanagements.view', {
        url: '/:attendancemanagementId',
        templateUrl: 'modules/attendancemanagements/client/views/view-attendancemanagement.client.view.html',
        controller: 'AttendancemanagementsController',
        controllerAs: 'vm',
        resolve: {
          attendancemanagementResolve: getAttendancemanagement
        },
        data: {
          pageTitle: 'Attendancemanagement {{ attendancemanagementResolve.name }}'
        }
      });
  }

  getAttendancemanagement.$inject = ['$stateParams', 'AttendancemanagementsService'];

  function getAttendancemanagement($stateParams, AttendancemanagementsService) {
    return AttendancemanagementsService.get({
      attendancemanagementId: $stateParams.attendancemanagementId
    }).$promise;
  }

  newAttendancemanagement.$inject = ['AttendancemanagementsService'];

  function newAttendancemanagement(AttendancemanagementsService) {
    return new AttendancemanagementsService();
  }
}());
