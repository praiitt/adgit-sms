(function () {
  'use strict';

  // Attendancemanagements controller
  angular
    .module('attendancemanagements')
    .controller('AttendancemanagementsController', AttendancemanagementsController);

  AttendancemanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'attendancemanagementResolve'];

  function AttendancemanagementsController ($scope, $state, $window, Authentication, attendancemanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.attendancemanagement = attendancemanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Attendancemanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.attendancemanagement.$remove($state.go('attendancemanagements.list'));
      }
    }

    // Save Attendancemanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.attendancemanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.attendancemanagement._id) {
        vm.attendancemanagement.$update(successCallback, errorCallback);
      } else {
        vm.attendancemanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('attendancemanagements.view', {
          attendancemanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
