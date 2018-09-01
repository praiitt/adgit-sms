(function () {
  'use strict';

  // Admissionmanagements controller
  angular
    .module('admissionmanagements')
    .controller('AdmissionmanagementsController', AdmissionmanagementsController);

  AdmissionmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'admissionmanagementResolve'];

  function AdmissionmanagementsController ($scope, $state, $window, Authentication, admissionmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.admissionmanagement = admissionmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Admissionmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.admissionmanagement.$remove($state.go('admissionmanagements.list'));
      }
    }

    // Save Admissionmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.admissionmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.admissionmanagement._id) {
        vm.admissionmanagement.$update(successCallback, errorCallback);
      } else {
        vm.admissionmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admissionmanagements.view', {
          admissionmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
