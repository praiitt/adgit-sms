(function () {
  'use strict';

  angular
    .module('notificationmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('notificationmanagements', {
        abstract: true,
        url: '/notificationmanagements',
        template: '<ui-view/>'
      })
      .state('notificationmanagements.list', {
        url: '',
        templateUrl: 'modules/notificationmanagements/client/views/list-notificationmanagements.client.view.html',
        controller: 'NotificationmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Notificationmanagements List'
        }
      })
      .state('notificationmanagements.create', {
        url: '/create',
        templateUrl: 'modules/notificationmanagements/client/views/form-notificationmanagement.client.view.html',
        controller: 'NotificationmanagementsController',
        controllerAs: 'vm',
        resolve: {
          notificationmanagementResolve: newNotificationmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Notificationmanagements Create'
        }
      })
      .state('notificationmanagements.edit', {
        url: '/:notificationmanagementId/edit',
        templateUrl: 'modules/notificationmanagements/client/views/form-notificationmanagement.client.view.html',
        controller: 'NotificationmanagementsController',
        controllerAs: 'vm',
        resolve: {
          notificationmanagementResolve: getNotificationmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Notificationmanagement {{ notificationmanagementResolve.name }}'
        }
      })
      .state('notificationmanagements.view', {
        url: '/:notificationmanagementId',
        templateUrl: 'modules/notificationmanagements/client/views/view-notificationmanagement.client.view.html',
        controller: 'NotificationmanagementsController',
        controllerAs: 'vm',
        resolve: {
          notificationmanagementResolve: getNotificationmanagement
        },
        data: {
          pageTitle: 'Notificationmanagement {{ notificationmanagementResolve.name }}'
        }
      });
  }

  getNotificationmanagement.$inject = ['$stateParams', 'NotificationmanagementsService'];

  function getNotificationmanagement($stateParams, NotificationmanagementsService) {
    return NotificationmanagementsService.get({
      notificationmanagementId: $stateParams.notificationmanagementId
    }).$promise;
  }

  newNotificationmanagement.$inject = ['NotificationmanagementsService'];

  function newNotificationmanagement(NotificationmanagementsService) {
    return new NotificationmanagementsService();
  }
}());
