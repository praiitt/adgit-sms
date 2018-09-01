(function () {
  'use strict';

  angular
    .module('admissionmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admissionmanagements', {
        abstract: true,
        url: '/admissionmanagements',
        template: '<ui-view/>'
      })
      .state('admissionmanagements.list', {
        url: '',
        templateUrl: 'modules/admissionmanagements/client/views/list-admissionmanagements.client.view.html',
        controller: 'AdmissionmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Admissionmanagements List'
        }
      })
      .state('admissionmanagements.create', {
        url: '/create',
        templateUrl: 'modules/admissionmanagements/client/views/form-admissionmanagement.client.view.html',
        controller: 'AdmissionmanagementsController',
        controllerAs: 'vm',
        resolve: {
          admissionmanagementResolve: newAdmissionmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Admissionmanagements Create'
        }
      })
      .state('admissionmanagements.edit', {
        url: '/:admissionmanagementId/edit',
        templateUrl: 'modules/admissionmanagements/client/views/form-admissionmanagement.client.view.html',
        controller: 'AdmissionmanagementsController',
        controllerAs: 'vm',
        resolve: {
          admissionmanagementResolve: getAdmissionmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Admissionmanagement {{ admissionmanagementResolve.name }}'
        }
      })
      .state('admissionmanagements.view', {
        url: '/:admissionmanagementId',
        templateUrl: 'modules/admissionmanagements/client/views/view-admissionmanagement.client.view.html',
        controller: 'AdmissionmanagementsController',
        controllerAs: 'vm',
        resolve: {
          admissionmanagementResolve: getAdmissionmanagement
        },
        data: {
          pageTitle: 'Admissionmanagement {{ admissionmanagementResolve.name }}'
        }
      });
  }

  getAdmissionmanagement.$inject = ['$stateParams', 'AdmissionmanagementsService'];

  function getAdmissionmanagement($stateParams, AdmissionmanagementsService) {
    return AdmissionmanagementsService.get({
      admissionmanagementId: $stateParams.admissionmanagementId
    }).$promise;
  }

  newAdmissionmanagement.$inject = ['AdmissionmanagementsService'];

  function newAdmissionmanagement(AdmissionmanagementsService) {
    return new AdmissionmanagementsService();
  }
}());
