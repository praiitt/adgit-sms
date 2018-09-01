(function () {
  'use strict';

  // Payrollmanagements controller
  angular
    .module('payrollmanagements')
    .controller('PayrollmanagementsController', PayrollmanagementsController);

  PayrollmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'payrollmanagementResolve'];

  function PayrollmanagementsController ($scope, $state, $window, Authentication, payrollmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.payrollmanagement = payrollmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Payrollmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.payrollmanagement.$remove($state.go('payrollmanagements.list'));
      }
    }

    // Save Payrollmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.payrollmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.payrollmanagement._id) {
        vm.payrollmanagement.$update(successCallback, errorCallback);
      } else {
        vm.payrollmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('payrollmanagements.view', {
          payrollmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
