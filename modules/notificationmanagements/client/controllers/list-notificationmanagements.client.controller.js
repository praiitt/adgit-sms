(function () {
  'use strict';

  angular
    .module('notificationmanagements')
    .controller('NotificationmanagementsListController', NotificationmanagementsListController);

  NotificationmanagementsListController.$inject = ['NotificationmanagementsService'];

  function NotificationmanagementsListController(NotificationmanagementsService) {
    var vm = this;

    vm.notificationmanagements = NotificationmanagementsService.query();
  }
}());
