(function () {
  'use strict';

  angular
    .module('gallerymanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('gallerymanagements', {
        abstract: true,
        url: '/gallerymanagements',
        template: '<ui-view/>'
      })
      .state('gallerymanagements.list', {
        url: '',
        templateUrl: 'modules/gallerymanagements/client/views/list-gallerymanagements.client.view.html',
        controller: 'GallerymanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Gallerymanagements List'
        }
      })
      .state('gallerymanagements.create', {
        url: '/create',
        templateUrl: 'modules/gallerymanagements/client/views/form-gallerymanagement.client.view.html',
        controller: 'GallerymanagementsController',
        controllerAs: 'vm',
        resolve: {
          gallerymanagementResolve: newGallerymanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Gallerymanagements Create'
        }
      })
      .state('gallerymanagements.edit', {
        url: '/:gallerymanagementId/edit',
        templateUrl: 'modules/gallerymanagements/client/views/form-gallerymanagement.client.view.html',
        controller: 'GallerymanagementsController',
        controllerAs: 'vm',
        resolve: {
          gallerymanagementResolve: getGallerymanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Gallerymanagement {{ gallerymanagementResolve.name }}'
        }
      })
      .state('gallerymanagements.view', {
        url: '/:gallerymanagementId',
        templateUrl: 'modules/gallerymanagements/client/views/view-gallerymanagement.client.view.html',
        controller: 'GallerymanagementsController',
        controllerAs: 'vm',
        resolve: {
          gallerymanagementResolve: getGallerymanagement
        },
        data: {
          pageTitle: 'Gallerymanagement {{ gallerymanagementResolve.name }}'
        }
      });
  }

  getGallerymanagement.$inject = ['$stateParams', 'GallerymanagementsService'];

  function getGallerymanagement($stateParams, GallerymanagementsService) {
    return GallerymanagementsService.get({
      gallerymanagementId: $stateParams.gallerymanagementId
    }).$promise;
  }

  newGallerymanagement.$inject = ['GallerymanagementsService'];

  function newGallerymanagement(GallerymanagementsService) {
    return new GallerymanagementsService();
  }
}());
