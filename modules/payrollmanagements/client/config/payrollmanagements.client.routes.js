(function () {
  'use strict';

  angular
    .module('payrollmanagements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('payrollmanagements', {
        abstract: true,
        url: '/payrollmanagements',
        template: '<ui-view/>'
      })
      .state('payrollmanagements.list', {
        url: '',
        templateUrl: 'modules/payrollmanagements/client/views/list-payrollmanagements.client.view.html',
        controller: 'PayrollmanagementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Payrollmanagements List'
        }
      })
      .state('payrollmanagements.create', {
        url: '/create',
        templateUrl: 'modules/payrollmanagements/client/views/form-payrollmanagement.client.view.html',
        controller: 'PayrollmanagementsController',
        controllerAs: 'vm',
        resolve: {
          payrollmanagementResolve: newPayrollmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Payrollmanagements Create'
        }
      })
      .state('payrollmanagements.edit', {
        url: '/:payrollmanagementId/edit',
        templateUrl: 'modules/payrollmanagements/client/views/form-payrollmanagement.client.view.html',
        controller: 'PayrollmanagementsController',
        controllerAs: 'vm',
        resolve: {
          payrollmanagementResolve: getPayrollmanagement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Payrollmanagement {{ payrollmanagementResolve.name }}'
        }
      })
      .state('payrollmanagements.view', {
        url: '/:payrollmanagementId',
        templateUrl: 'modules/payrollmanagements/client/views/view-payrollmanagement.client.view.html',
        controller: 'PayrollmanagementsController',
        controllerAs: 'vm',
        resolve: {
          payrollmanagementResolve: getPayrollmanagement
        },
        data: {
          pageTitle: 'Payrollmanagement {{ payrollmanagementResolve.name }}'
        }
      });
  }

  getPayrollmanagement.$inject = ['$stateParams', 'PayrollmanagementsService'];

  function getPayrollmanagement($stateParams, PayrollmanagementsService) {
    return PayrollmanagementsService.get({
      payrollmanagementId: $stateParams.payrollmanagementId
    }).$promise;
  }

  newPayrollmanagement.$inject = ['PayrollmanagementsService'];

  function newPayrollmanagement(PayrollmanagementsService) {
    return new PayrollmanagementsService();
  }
}());
