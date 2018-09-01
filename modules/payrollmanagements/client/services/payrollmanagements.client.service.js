// Payrollmanagements service used to communicate Payrollmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('payrollmanagements')
    .factory('PayrollmanagementsService', PayrollmanagementsService);

  PayrollmanagementsService.$inject = ['$resource'];

  function PayrollmanagementsService($resource) {
    return $resource('api/payrollmanagements/:payrollmanagementId', {
      payrollmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
