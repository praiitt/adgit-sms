(function () {
  'use strict';

  angular
    .module('gallerymanagements')
    .controller('GallerymanagementsListController', GallerymanagementsListController);

  GallerymanagementsListController.$inject = ['GallerymanagementsService'];

  function GallerymanagementsListController(GallerymanagementsService) {
    var vm = this;

    vm.gallerymanagements = GallerymanagementsService.query();
  }
}());
