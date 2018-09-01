(function () {
  'use strict';

  // Notificationmanagements controller
  angular
    .module('notificationmanagements')
    .controller('NotificationmanagementsController', NotificationmanagementsController);

  NotificationmanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'notificationmanagementResolve'];

  function NotificationmanagementsController ($scope, $state, $window, Authentication, notificationmanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.notificationmanagement = notificationmanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Notificationmanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.notificationmanagement.$remove($state.go('notificationmanagements.list'));
      }
    }

    // Save Notificationmanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.notificationmanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.notificationmanagement._id) {
        vm.notificationmanagement.$update(successCallback, errorCallback);
      } else {
        vm.notificationmanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('notificationmanagements.view', {
          notificationmanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
