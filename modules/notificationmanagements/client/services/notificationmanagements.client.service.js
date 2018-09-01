// Notificationmanagements service used to communicate Notificationmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('notificationmanagements')
    .factory('NotificationmanagementsService', NotificationmanagementsService);

  NotificationmanagementsService.$inject = ['$resource'];

  function NotificationmanagementsService($resource) {
    return $resource('api/notificationmanagements/:notificationmanagementId', {
      notificationmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
