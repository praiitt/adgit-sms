(function () {
  'use strict';

  angular
    .module('subjectmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('subjectmanagements', {
        abstract: true,
        url: '/subjectmanagements',
        template: '<ui-view/>'
      })
      .state('subjectmanagements.list', {
        url: '',
        templateUrl: 'modules/subjectmanagements/client/views/list-subjectmanagements.client.view.html',
        controller: 'SubjectmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Subjectmanagements List'
        }
      })
      .state('subjectmanagements.create', {
        url: '/create',
        templateUrl: 'modules/subjectmanagements/client/views/form-subjectmanagement.client.view.html',
        controller: 'SubjectmanagementsController',
        controllerAs: 'vm',
        resolve: {
          subjectmanagementResolve: newSubjectmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Subjectmanagements Create'
        }
      })
      .state('subjectmanagements.edit', {
        url: '/:subjectmanagementId/edit',
        templateUrl: 'modules/subjectmanagements/client/views/form-subjectmanagement.client.view.html',
        controller: 'SubjectmanagementsController',
        controllerAs: 'vm',
        resolve: {
          subjectmanagementResolve: getSubjectmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Subjectmanagement {{ subjectmanagementResolve.name }}'
        }
      })
      .state('subjectmanagements.view', {
        url: '/:subjectmanagementId',
        templateUrl: 'modules/subjectmanagements/client/views/view-subjectmanagement.client.view.html',
        controller: 'SubjectmanagementsController',
        controllerAs: 'vm',
        resolve: {
          subjectmanagementResolve: getSubjectmanagement
        },
        data: {
          pageTitle: 'Subjectmanagement {{ subjectmanagementResolve.name }}'
        }
      });
  }

  getSubjectmanagement.$inject = ['$stateParams', 'SubjectmanagementsService'];

  function getSubjectmanagement($stateParams, SubjectmanagementsService) {
    return SubjectmanagementsService.get({
      subjectmanagementId: $stateParams.subjectmanagementId
    }).$promise;
  }

  newSubjectmanagement.$inject = ['SubjectmanagementsService'];

  function newSubjectmanagement(SubjectmanagementsService) {
    return new SubjectmanagementsService();
  }
}());
