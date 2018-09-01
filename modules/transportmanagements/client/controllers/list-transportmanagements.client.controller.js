(function () {
  'use strict';

  angular
    .module('transportmanagements')
    .controller('TransportmanagementsListController', TransportmanagementsListController);

  TransportmanagementsListController.$inject = ['TransportmanagementsService'];

  function TransportmanagementsListController(TransportmanagementsService) {
    var vm = this;

    vm.transportmanagements = TransportmanagementsService.query();
  }
}());
