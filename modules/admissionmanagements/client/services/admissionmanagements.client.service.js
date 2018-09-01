// Admissionmanagements service used to communicate Admissionmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('admissionmanagements')
    .factory('AdmissionmanagementsService', AdmissionmanagementsService);

  AdmissionmanagementsService.$inject = ['$resource'];

  function AdmissionmanagementsService($resource) {
    return $resource('api/admissionmanagements/:admissionmanagementId', {
      admissionmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
