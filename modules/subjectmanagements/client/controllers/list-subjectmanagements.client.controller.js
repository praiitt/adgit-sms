(function () {
  'use strict';

  angular
    .module('subjectmanagements')
    .controller('SubjectmanagementsListController', SubjectmanagementsListController);

  SubjectmanagementsListController.$inject = ['SubjectmanagementsService'];

  function SubjectmanagementsListController(SubjectmanagementsService) {
    var vm = this;

    vm.subjectmanagements = SubjectmanagementsService.query();
  }
}());
