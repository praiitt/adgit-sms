// Onlinetestmanagements service used to communicate Onlinetestmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('onlinetestmanagements')
    .factory('OnlinetestmanagementsService', OnlinetestmanagementsService);

  OnlinetestmanagementsService.$inject = ['$resource'];

  function OnlinetestmanagementsService($resource) {
    return $resource('api/onlinetestmanagements/:onlinetestmanagementId', {
      onlinetestmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
