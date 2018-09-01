(function () {
  'use strict';

  // Gallerymanagements controller
  angular
    .module('gallerymanagements')
    .controller('GallerymanagementsController', GallerymanagementsController);

  GallerymanagementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'gallerymanagementResolve'];

  function GallerymanagementsController ($scope, $state, $window, Authentication, gallerymanagement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.gallerymanagement = gallerymanagement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Gallerymanagement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.gallerymanagement.$remove($state.go('gallerymanagements.list'));
      }
    }

    // Save Gallerymanagement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.gallerymanagementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.gallerymanagement._id) {
        vm.gallerymanagement.$update(successCallback, errorCallback);
      } else {
        vm.gallerymanagement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('gallerymanagements.view', {
          gallerymanagementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
