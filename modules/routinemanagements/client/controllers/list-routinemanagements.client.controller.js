(function () {
  'use strict';

  angular
    .module('routinemanagements')
    .controller('RoutinemanagementsListController', RoutinemanagementsListController);

  RoutinemanagementsListController.$inject = ['RoutinemanagementsService'];

  function RoutinemanagementsListController(RoutinemanagementsService) {
    var vm = this;

    vm.routinemanagements = RoutinemanagementsService.query();
  }
}());
