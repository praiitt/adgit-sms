(function () {
  'use strict';

  describe('Payrollmanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      PayrollmanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PayrollmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PayrollmanagementsService = _PayrollmanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('payrollmanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/payrollmanagements');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PayrollmanagementsController,
          mockPayrollmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('payrollmanagements.view');
          $templateCache.put('modules/payrollmanagements/client/views/view-payrollmanagement.client.view.html', '');

          // create mock Payrollmanagement
          mockPayrollmanagement = new PayrollmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Payrollmanagement Name'
          });

          // Initialize Controller
          PayrollmanagementsController = $controller('PayrollmanagementsController as vm', {
            $scope: $scope,
            payrollmanagementResolve: mockPayrollmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:payrollmanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.payrollmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            payrollmanagementId: 1
          })).toEqual('/payrollmanagements/1');
        }));

        it('should attach an Payrollmanagement to the controller scope', function () {
          expect($scope.vm.payrollmanagement._id).toBe(mockPayrollmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/payrollmanagements/client/views/view-payrollmanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PayrollmanagementsController,
          mockPayrollmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('payrollmanagements.create');
          $templateCache.put('modules/payrollmanagements/client/views/form-payrollmanagement.client.view.html', '');

          // create mock Payrollmanagement
          mockPayrollmanagement = new PayrollmanagementsService();

          // Initialize Controller
          PayrollmanagementsController = $controller('PayrollmanagementsController as vm', {
            $scope: $scope,
            payrollmanagementResolve: mockPayrollmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.payrollmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/payrollmanagements/create');
        }));

        it('should attach an Payrollmanagement to the controller scope', function () {
          expect($scope.vm.payrollmanagement._id).toBe(mockPayrollmanagement._id);
          expect($scope.vm.payrollmanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/payrollmanagements/client/views/form-payrollmanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PayrollmanagementsController,
          mockPayrollmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('payrollmanagements.edit');
          $templateCache.put('modules/payrollmanagements/client/views/form-payrollmanagement.client.view.html', '');

          // create mock Payrollmanagement
          mockPayrollmanagement = new PayrollmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Payrollmanagement Name'
          });

          // Initialize Controller
          PayrollmanagementsController = $controller('PayrollmanagementsController as vm', {
            $scope: $scope,
            payrollmanagementResolve: mockPayrollmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:payrollmanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.payrollmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            payrollmanagementId: 1
          })).toEqual('/payrollmanagements/1/edit');
        }));

        it('should attach an Payrollmanagement to the controller scope', function () {
          expect($scope.vm.payrollmanagement._id).toBe(mockPayrollmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/payrollmanagements/client/views/form-payrollmanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
