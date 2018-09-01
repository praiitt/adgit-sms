(function () {
  'use strict';

  angular
    .module('admissionmanagements')
    .controller('AdmissionmanagementsListController', AdmissionmanagementsListController);

  AdmissionmanagementsListController.$inject = ['AdmissionmanagementsService'];

  function AdmissionmanagementsListController(AdmissionmanagementsService) {
    var vm = this;

    vm.admissionmanagements = AdmissionmanagementsService.query();
  }
}());
