(function () {
  'use strict';

  // Transportmanagements controller
  angular
    .module('transportmanagements')
    .controller('TransportmanagementsController', TransportmanagementsController);

  TransportmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'transportmanagementResolve'];

  function TransportmanagementsController ($scope, $state, $window, Authentication, transportmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.transportmanagement = transportmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Transportmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.transportmanagement.$remove($state.go('transportmanagements.list'));
      }
    }

    // Save Transportmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.transportmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.transportmanagement._id) {
        vm.transportmanagement.$update(successCallback, errorCallback);
      } else {
        vm.transportmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('transportmanagements.view', {
          transportmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
