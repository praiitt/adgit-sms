(function () {
  'use strict';

  // Sportsmanagements controller
  angular
    .module('sportsmanagements')
    .controller('SportsmanagementsController', SportsmanagementsController);

  SportsmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'sportsmanagementResolve'];

  function SportsmanagementsController ($scope, $state, $window, Authentication, sportsmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.sportsmanagement = sportsmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Sportsmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.sportsmanagement.$remove($state.go('sportsmanagements.list'));
      }
    }

    // Save Sportsmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.sportsmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.sportsmanagement._id) {
        vm.sportsmanagement.$update(successCallback, errorCallback);
      } else {
        vm.sportsmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('sportsmanagements.view', {
          sportsmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
