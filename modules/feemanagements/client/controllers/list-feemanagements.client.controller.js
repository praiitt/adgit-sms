(function () {
  'use strict';

  angular
    .module('feemanagements')
    .controller('FeemanagementsListController', FeemanagementsListController);

  FeemanagementsListController.$inject = ['FeemanagementsService'];

  function FeemanagementsListController(FeemanagementsService) {
    var vm = this;

    vm.feemanagements = FeemanagementsService.query();
  }
}());
