(function () {
  'use strict';

  angular
    .module('attendancemanagements')
    .controller('AttendancemanagementsListController', AttendancemanagementsListController);

  AttendancemanagementsListController.$inject = ['AttendancemanagementsService'];

  function AttendancemanagementsListController(AttendancemanagementsService) {
    var vm = this;

    vm.attendancemanagements = AttendancemanagementsService.query();
  }
}());
