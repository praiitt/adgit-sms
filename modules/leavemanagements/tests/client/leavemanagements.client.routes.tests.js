(function () {
  'use strict';

  describe('Leavemanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      LeavemanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _LeavemanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      LeavemanagementsService = _LeavemanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('leavemanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/leavemanagements');
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
          LeavemanagementsController,
          mockLeavemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('leavemanagements.view');
          $templateCache.put('modules/leavemanagements/client/views/view-leavemanagement.client.view.html', '');

          // create mock Leavemanagement
          mockLeavemanagement = new LeavemanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Leavemanagement Name'
          });

          // Initialize Controller
          LeavemanagementsController = $controller('LeavemanagementsController as vm', {
            $scope: $scope,
            leavemanagementResolve: mockLeavemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:leavemanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.leavemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            leavemanagementId: 1
          })).toEqual('/leavemanagements/1');
        }));

        it('should attach an Leavemanagement to the controller scope', function () {
          expect($scope.vm.leavemanagement._id).toBe(mockLeavemanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/leavemanagements/client/views/view-leavemanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          LeavemanagementsController,
          mockLeavemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('leavemanagements.create');
          $templateCache.put('modules/leavemanagements/client/views/form-leavemanagement.client.view.html', '');

          // create mock Leavemanagement
          mockLeavemanagement = new LeavemanagementsService();

          // Initialize Controller
          LeavemanagementsController = $controller('LeavemanagementsController as vm', {
            $scope: $scope,
            leavemanagementResolve: mockLeavemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.leavemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/leavemanagements/create');
        }));

        it('should attach an Leavemanagement to the controller scope', function () {
          expect($scope.vm.leavemanagement._id).toBe(mockLeavemanagement._id);
          expect($scope.vm.leavemanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/leavemanagements/client/views/form-leavemanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          LeavemanagementsController,
          mockLeavemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('leavemanagements.edit');
          $templateCache.put('modules/leavemanagements/client/views/form-leavemanagement.client.view.html', '');

          // create mock Leavemanagement
          mockLeavemanagement = new LeavemanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Leavemanagement Name'
          });

          // Initialize Controller
          LeavemanagementsController = $controller('LeavemanagementsController as vm', {
            $scope: $scope,
            leavemanagementResolve: mockLeavemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:leavemanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.leavemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            leavemanagementId: 1
          })).toEqual('/leavemanagements/1/edit');
        }));

        it('should attach an Leavemanagement to the controller scope', function () {
          expect($scope.vm.leavemanagement._id).toBe(mockLeavemanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/leavemanagements/client/views/form-leavemanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
