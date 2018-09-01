(function () {
  'use strict';

  angular
    .module('leavemanagements')
    .controller('LeavemanagementsListController', LeavemanagementsListController);

  LeavemanagementsListController.$inject = ['LeavemanagementsService'];

  function LeavemanagementsListController(LeavemanagementsService) {
    var vm = this;

    vm.leavemanagements = LeavemanagementsService.query();
  }
}());
