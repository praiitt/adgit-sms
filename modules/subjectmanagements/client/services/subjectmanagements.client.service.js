// Subjectmanagements service used to communicate Subjectmanagements REST endpoints
(function () {
  'use strict';

  angular
    .module('subjectmanagements')
    .factory('SubjectmanagementsService', SubjectmanagementsService);

  SubjectmanagementsService.$inject = ['$resource'];

  function SubjectmanagementsService($resource) {
    return $resource('api/subjectmanagements/:subjectmanagementId', {
      subjectmanagementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
