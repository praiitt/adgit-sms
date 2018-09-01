(function () {
  'use strict';

  // Subjectmanagements controller
  angular
    .module('subjectmanagements')
    .controller('SubjectmanagementsController', SubjectmanagementsController);

  SubjectmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'subjectmanagementResolve'];

  function SubjectmanagementsController ($scope, $state, $window, Authentication, subjectmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.subjectmanagement = subjectmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Subjectmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.subjectmanagement.$remove($state.go('subjectmanagements.list'));
      }
    }

    // Save Subjectmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.subjectmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.subjectmanagement._id) {
        vm.subjectmanagement.$update(successCallback, errorCallback);
      } else {
        vm.subjectmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('subjectmanagements.view', {
          subjectmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
