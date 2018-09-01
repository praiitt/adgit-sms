(function () {
  'use strict';

  angular
    .module('onlinetestmanagements')
    .controller('OnlinetestmanagementsListController', OnlinetestmanagementsListController);

  OnlinetestmanagementsListController.$inject = ['OnlinetestmanagementsService'];

  function OnlinetestmanagementsListController(OnlinetestmanagementsService) {
    var vm = this;

    vm.onlinetestmanagements = OnlinetestmanagementsService.query();
  }
}());
