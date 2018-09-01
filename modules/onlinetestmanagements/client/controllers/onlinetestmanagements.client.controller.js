(function () {
  'use strict';

  // Onlinetestmanagements controller
  angular
    .module('onlinetestmanagements')
    .controller('OnlinetestmanagementsController', OnlinetestmanagementsController);

  OnlinetestmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'onlinetestmanagementResolve'];

  function OnlinetestmanagementsController ($scope, $state, $window, Authentication, onlinetestmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.onlinetestmanagement = onlinetestmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Onlinetestmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.onlinetestmanagement.$remove($state.go('onlinetestmanagements.list'));
      }
    }

    // Save Onlinetestmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.onlinetestmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.onlinetestmanagement._id) {
        vm.onlinetestmanagement.$update(successCallback, errorCallback);
      } else {
        vm.onlinetestmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('onlinetestmanagements.view', {
          onlinetestmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
