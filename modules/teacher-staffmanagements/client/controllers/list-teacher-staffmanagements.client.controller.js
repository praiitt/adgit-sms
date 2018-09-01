(function () {
  'use strict';

  angular
    .module('teacher-staffmanagements')
    .controller('TeacherStaffmanagementsListController', TeacherStaffmanagementsListController);

  TeacherStaffmanagementsListController.$inject = ['TeacherStaffmanagementsService'];

  function TeacherStaffmanagementsListController(TeacherStaffmanagementsService) {
    var vm = this;

    vm.teacherStaffmanagements = TeacherStaffmanagementsService.query();
  }
}());
