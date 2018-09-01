(function () {
  'use strict';

  // Teacher staffmanagements controller
  angular
    .module('teacher-staffmanagements')
    .controller('TeacherStaffmanagementsController', TeacherStaffmanagementsController);

  TeacherStaffmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'teacherStaffmanagementResolve'];

  function TeacherStaffmanagementsController ($scope, $state, $window, Authentication, teacherStaffmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.teacherStaffmanagement = teacherStaffmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Teacher staffmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.teacherStaffmanagement.$remove($state.go('teacher-staffmanagements.list'));
      }
    }

    // Save Teacher staffmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.teacherStaffmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.teacherStaffmanagement._id) {
        vm.teacherStaffmanagement.$update(successCallback, errorCallback);
      } else {
        vm.teacherStaffmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('teacher-staffmanagements.view', {
          teacherStaffmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
