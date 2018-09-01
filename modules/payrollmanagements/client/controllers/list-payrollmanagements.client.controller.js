(function () {
  'use strict';

  angular
    .module('payrollmanagements')
    .controller('PayrollmanagementsListController', PayrollmanagementsListController);

  PayrollmanagementsListController.$inject = ['PayrollmanagementsService'];

  function PayrollmanagementsListController(PayrollmanagementsService) {
    var vm = this;

    vm.payrollmanagements = PayrollmanagementsService.query();
  }
}());
