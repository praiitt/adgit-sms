(function () {
  'use strict';

  angular
    .module('sportsmanagements')
    .controller('SportsmanagementsListController', SportsmanagementsListController);

  SportsmanagementsListController.$inject = ['SportsmanagementsService'];

  function SportsmanagementsListController(SportsmanagementsService) {
    var vm = this;

    vm.sportsmanagements = SportsmanagementsService.query();
  }
}());
