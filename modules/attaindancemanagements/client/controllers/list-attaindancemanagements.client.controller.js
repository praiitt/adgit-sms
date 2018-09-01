(function () {
  'use strict';

  angular
    .module('attaindancemanagements')
    .controller('AttaindancemanagementsListController', AttaindancemanagementsListController);

  AttaindancemanagementsListController.$inject = ['AttaindancemanagementsService'];

  function AttaindancemanagementsListController(AttaindancemanagementsService) {
    var vm = this;

    vm.attaindancemanagements = AttaindancemanagementsService.query();
  }
}());
