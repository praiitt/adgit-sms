(function () {
  'use strict';

  // Attaindancemanagements controller
  angular
    .module('attaindancemanagements')
    .controller('AttaindancemanagementsController', AttaindancemanagementsController);

  AttaindancemanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'attaindancemanagementResolve'];

  function AttaindancemanagementsController ($scope, $state, $window, Authentication, attaindancemanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.attaindancemanagement = attaindancemanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Attaindancemanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.attaindancemanagement.$remove($state.go('attaindancemanagements.list'));
      }
    }

    // Save Attaindancemanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.attaindancemanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.attaindancemanagement._id) {
        vm.attaindancemanagement.$update(successCallback, errorCallback);
      } else {
        vm.attaindancemanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('attaindancemanagements.view', {
          attaindancemanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
