(function () {
  'use strict';

  // Routinemanagements controller
  angular
    .module('routinemanagements')
    .controller('RoutinemanagementsController', RoutinemanagementsController);

  RoutinemanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'routinemanagementResolve'];

  function RoutinemanagementsController ($scope, $state, $window, Authentication, routinemanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.routinemanagement = routinemanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Routinemanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.routinemanagement.$remove($state.go('routinemanagements.list'));
      }
    }

    // Save Routinemanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.routinemanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.routinemanagement._id) {
        vm.routinemanagement.$update(successCallback, errorCallback);
      } else {
        vm.routinemanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('routinemanagements.view', {
          routinemanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
