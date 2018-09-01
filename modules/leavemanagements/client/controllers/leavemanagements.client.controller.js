(function () {
  'use strict';

  // Leavemanagements controller
  angular
    .module('leavemanagements')
    .controller('LeavemanagementsController', LeavemanagementsController);

  LeavemanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'leavemanagementResolve'];

  function LeavemanagementsController ($scope, $state, $window, Authentication, leavemanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.leavemanagement = leavemanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Leavemanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.leavemanagement.$remove($state.go('leavemanagements.list'));
      }
    }

    // Save Leavemanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.leavemanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.leavemanagement._id) {
        vm.leavemanagement.$update(successCallback, errorCallback);
      } else {
        vm.leavemanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('leavemanagements.view', {
          leavemanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
