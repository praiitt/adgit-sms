(function () {
  'use strict';

  // Documentmanagements controller
  angular
    .module('documentmanagements')
    .controller('DocumentmanagementsController', DocumentmanagementsController);

  DocumentmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'documentmanagementResolve'];

  function DocumentmanagementsController ($scope, $state, $window, Authentication, documentmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.documentmanagement = documentmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Documentmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.documentmanagement.$remove($state.go('documentmanagements.list'));
      }
    }

    // Save Documentmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.documentmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.documentmanagement._id) {
        vm.documentmanagement.$update(successCallback, errorCallback);
      } else {
        vm.documentmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('documentmanagements.view', {
          documentmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
