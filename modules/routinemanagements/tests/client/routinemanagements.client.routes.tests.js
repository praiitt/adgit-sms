(function () {
  'use strict';

  describe('Routinemanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      RoutinemanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RoutinemanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RoutinemanagementsService = _RoutinemanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('routinemanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/routinemanagements');
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
          RoutinemanagementsController,
          mockRoutinemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('routinemanagements.view');
          $templateCache.put('modules/routinemanagements/client/views/view-routinemanagement.client.view.html', '');

          // create mock Routinemanagement
          mockRoutinemanagement = new RoutinemanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Routinemanagement Name'
          });

          // Initialize Controller
          RoutinemanagementsController = $controller('RoutinemanagementsController as vm', {
            $scope: $scope,
            routinemanagementResolve: mockRoutinemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:routinemanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.routinemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            routinemanagementId: 1
          })).toEqual('/routinemanagements/1');
        }));

        it('should attach an Routinemanagement to the controller scope', function () {
          expect($scope.vm.routinemanagement._id).toBe(mockRoutinemanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/routinemanagements/client/views/view-routinemanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RoutinemanagementsController,
          mockRoutinemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('routinemanagements.create');
          $templateCache.put('modules/routinemanagements/client/views/form-routinemanagement.client.view.html', '');

          // create mock Routinemanagement
          mockRoutinemanagement = new RoutinemanagementsService();

          // Initialize Controller
          RoutinemanagementsController = $controller('RoutinemanagementsController as vm', {
            $scope: $scope,
            routinemanagementResolve: mockRoutinemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.routinemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/routinemanagements/create');
        }));

        it('should attach an Routinemanagement to the controller scope', function () {
          expect($scope.vm.routinemanagement._id).toBe(mockRoutinemanagement._id);
          expect($scope.vm.routinemanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/routinemanagements/client/views/form-routinemanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RoutinemanagementsController,
          mockRoutinemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('routinemanagements.edit');
          $templateCache.put('modules/routinemanagements/client/views/form-routinemanagement.client.view.html', '');

          // create mock Routinemanagement
          mockRoutinemanagement = new RoutinemanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Routinemanagement Name'
          });

          // Initialize Controller
          RoutinemanagementsController = $controller('RoutinemanagementsController as vm', {
            $scope: $scope,
            routinemanagementResolve: mockRoutinemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:routinemanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.routinemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            routinemanagementId: 1
          })).toEqual('/routinemanagements/1/edit');
        }));

        it('should attach an Routinemanagement to the controller scope', function () {
          expect($scope.vm.routinemanagement._id).toBe(mockRoutinemanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/routinemanagements/client/views/form-routinemanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
