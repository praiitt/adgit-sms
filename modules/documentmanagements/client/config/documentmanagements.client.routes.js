(function () {
  'use strict';

  angular
    .module('documentmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('documentmanagements', {
        abstract: true,
        url: '/documentmanagements',
        template: '<ui-view/>'
      })
      .state('documentmanagements.list', {
        url: '',
        templateUrl: 'modules/documentmanagements/client/views/list-documentmanagements.client.view.html',
        controller: 'DocumentmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Documentmanagements List'
        }
      })
      .state('documentmanagements.create', {
        url: '/create',
        templateUrl: 'modules/documentmanagements/client/views/form-documentmanagement.client.view.html',
        controller: 'DocumentmanagementsController',
        controllerAs: 'vm',
        resolve: {
          documentmanagementResolve: newDocumentmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Documentmanagements Create'
        }
      })
      .state('documentmanagements.edit', {
        url: '/:documentmanagementId/edit',
        templateUrl: 'modules/documentmanagements/client/views/form-documentmanagement.client.view.html',
        controller: 'DocumentmanagementsController',
        controllerAs: 'vm',
        resolve: {
          documentmanagementResolve: getDocumentmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Documentmanagement {{ documentmanagementResolve.name }}'
        }
      })
      .state('documentmanagements.view', {
        url: '/:documentmanagementId',
        templateUrl: 'modules/documentmanagements/client/views/view-documentmanagement.client.view.html',
        controller: 'DocumentmanagementsController',
        controllerAs: 'vm',
        resolve: {
          documentmanagementResolve: getDocumentmanagement
        },
        data: {
          pageTitle: 'Documentmanagement {{ documentmanagementResolve.name }}'
        }
      });
  }

  getDocumentmanagement.$inject = ['$stateParams', 'DocumentmanagementsService'];

  function getDocumentmanagement($stateParams, DocumentmanagementsService) {
    return DocumentmanagementsService.get({
      documentmanagementId: $stateParams.documentmanagementId
    }).$promise;
  }

  newDocumentmanagement.$inject = ['DocumentmanagementsService'];

  function newDocumentmanagement(DocumentmanagementsService) {
    return new DocumentmanagementsService();
  }
}());
