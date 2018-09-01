(function () {
  'use strict';

  // Studentmanagements controller
  angular
    .module('studentmanagements')
    .controller('StudentmanagementsController', StudentmanagementsController);

  StudentmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'studentmanagementResolve'];

  function StudentmanagementsController ($scope, $state, $window, Authentication, studentmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.studentmanagement = studentmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Studentmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.studentmanagement.$remove($state.go('studentmanagements.list'));
      }
    }

    // Save Studentmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.studentmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.studentmanagement._id) {
        vm.studentmanagement.$update(successCallback, errorCallback);
      } else {
        vm.studentmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('studentmanagements.view', {
          studentmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
