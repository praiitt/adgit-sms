(function () {
  'use strict';

  describe('Attendancemanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      AttendancemanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AttendancemanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AttendancemanagementsService = _AttendancemanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('attendancemanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/attendancemanagements');
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
          AttendancemanagementsController,
          mockAttendancemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('attendancemanagements.view');
          $templateCache.put('modules/attendancemanagements/client/views/view-attendancemanagement.client.view.html', '');

          // create mock Attendancemanagement
          mockAttendancemanagement = new AttendancemanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Attendancemanagement Name'
          });

          // Initialize Controller
          AttendancemanagementsController = $controller('AttendancemanagementsController as vm', {
            $scope: $scope,
            attendancemanagementResolve: mockAttendancemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:attendancemanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.attendancemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            attendancemanagementId: 1
          })).toEqual('/attendancemanagements/1');
        }));

        it('should attach an Attendancemanagement to the controller scope', function () {
          expect($scope.vm.attendancemanagement._id).toBe(mockAttendancemanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/attendancemanagements/client/views/view-attendancemanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AttendancemanagementsController,
          mockAttendancemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('attendancemanagements.create');
          $templateCache.put('modules/attendancemanagements/client/views/form-attendancemanagement.client.view.html', '');

          // create mock Attendancemanagement
          mockAttendancemanagement = new AttendancemanagementsService();

          // Initialize Controller
          AttendancemanagementsController = $controller('AttendancemanagementsController as vm', {
            $scope: $scope,
            attendancemanagementResolve: mockAttendancemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.attendancemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/attendancemanagements/create');
        }));

        it('should attach an Attendancemanagement to the controller scope', function () {
          expect($scope.vm.attendancemanagement._id).toBe(mockAttendancemanagement._id);
          expect($scope.vm.attendancemanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/attendancemanagements/client/views/form-attendancemanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AttendancemanagementsController,
          mockAttendancemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('attendancemanagements.edit');
          $templateCache.put('modules/attendancemanagements/client/views/form-attendancemanagement.client.view.html', '');

          // create mock Attendancemanagement
          mockAttendancemanagement = new AttendancemanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Attendancemanagement Name'
          });

          // Initialize Controller
          AttendancemanagementsController = $controller('AttendancemanagementsController as vm', {
            $scope: $scope,
            attendancemanagementResolve: mockAttendancemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:attendancemanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.attendancemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            attendancemanagementId: 1
          })).toEqual('/attendancemanagements/1/edit');
        }));

        it('should attach an Attendancemanagement to the controller scope', function () {
          expect($scope.vm.attendancemanagement._id).toBe(mockAttendancemanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/attendancemanagements/client/views/form-attendancemanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
