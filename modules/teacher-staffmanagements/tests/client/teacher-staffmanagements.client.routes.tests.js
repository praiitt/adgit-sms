(function () {
  'use strict';

  describe('Teacher staffmanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      TeacherStaffmanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TeacherStaffmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TeacherStaffmanagementsService = _TeacherStaffmanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('teacher-staffmanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/teacher-staffmanagements');
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
          TeacherStaffmanagementsController,
          mockTeacherStaffmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('teacher-staffmanagements.view');
          $templateCache.put('modules/teacher-staffmanagements/client/views/view-teacher-staffmanagement.client.view.html', '');

          // create mock Teacher staffmanagement
          mockTeacherStaffmanagement = new TeacherStaffmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Teacher staffmanagement Name'
          });

          // Initialize Controller
          TeacherStaffmanagementsController = $controller('TeacherStaffmanagementsController as vm', {
            $scope: $scope,
            teacherStaffmanagementResolve: mockTeacherStaffmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:teacherStaffmanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.teacherStaffmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            teacherStaffmanagementId: 1
          })).toEqual('/teacher-staffmanagements/1');
        }));

        it('should attach an Teacher staffmanagement to the controller scope', function () {
          expect($scope.vm.teacherStaffmanagement._id).toBe(mockTeacherStaffmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/teacher-staffmanagements/client/views/view-teacher-staffmanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TeacherStaffmanagementsController,
          mockTeacherStaffmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('teacher-staffmanagements.create');
          $templateCache.put('modules/teacher-staffmanagements/client/views/form-teacher-staffmanagement.client.view.html', '');

          // create mock Teacher staffmanagement
          mockTeacherStaffmanagement = new TeacherStaffmanagementsService();

          // Initialize Controller
          TeacherStaffmanagementsController = $controller('TeacherStaffmanagementsController as vm', {
            $scope: $scope,
            teacherStaffmanagementResolve: mockTeacherStaffmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.teacherStaffmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/teacher-staffmanagements/create');
        }));

        it('should attach an Teacher staffmanagement to the controller scope', function () {
          expect($scope.vm.teacherStaffmanagement._id).toBe(mockTeacherStaffmanagement._id);
          expect($scope.vm.teacherStaffmanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/teacher-staffmanagements/client/views/form-teacher-staffmanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TeacherStaffmanagementsController,
          mockTeacherStaffmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('teacher-staffmanagements.edit');
          $templateCache.put('modules/teacher-staffmanagements/client/views/form-teacher-staffmanagement.client.view.html', '');

          // create mock Teacher staffmanagement
          mockTeacherStaffmanagement = new TeacherStaffmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Teacher staffmanagement Name'
          });

          // Initialize Controller
          TeacherStaffmanagementsController = $controller('TeacherStaffmanagementsController as vm', {
            $scope: $scope,
            teacherStaffmanagementResolve: mockTeacherStaffmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:teacherStaffmanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.teacherStaffmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            teacherStaffmanagementId: 1
          })).toEqual('/teacher-staffmanagements/1/edit');
        }));

        it('should attach an Teacher staffmanagement to the controller scope', function () {
          expect($scope.vm.teacherStaffmanagement._id).toBe(mockTeacherStaffmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/teacher-staffmanagements/client/views/form-teacherStaffmanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
