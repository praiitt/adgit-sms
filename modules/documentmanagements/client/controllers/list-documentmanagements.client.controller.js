(function () {
  'use strict';

  angular
    .module('documentmanagements')
    .controller('DocumentmanagementsListController', DocumentmanagementsListController);

  DocumentmanagementsListController.$inject = ['DocumentmanagementsService'];

  function DocumentmanagementsListController(DocumentmanagementsService) {
    var vm = this;

    vm.documentmanagements = DocumentmanagementsService.query();
  }
}());
