(function () {
  'use strict';

  angular
    .module('studentmanagements')
    .controller('StudentmanagementsListController', StudentmanagementsListController);

  StudentmanagementsListController.$inject = ['StudentmanagementsService'];

  function StudentmanagementsListController(StudentmanagementsService) {
    var vm = this;

    vm.studentmanagements = StudentmanagementsService.query();
  }
}());
