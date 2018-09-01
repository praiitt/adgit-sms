(function () {
  'use strict';

  // Feemanagements controller
  angular
    .module('feemanagements')
    .controller('FeemanagementsController', FeemanagementsController);

  FeemanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'feemanagementResolve'];

  function FeemanagementsController ($scope, $state, $window, Authentication, feemanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.feemanagement = feemanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Feemanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.feemanagement.$remove($state.go('feemanagements.list'));
      }
    }

    // Save Feemanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.feemanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.feemanagement._id) {
        vm.feemanagement.$update(successCallback, errorCallback);
      } else {
        vm.feemanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('feemanagements.view', {
          feemanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
