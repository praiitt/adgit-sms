(function () {
  'use strict';

  describe('Studentmanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      StudentmanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _StudentmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      StudentmanagementsService = _StudentmanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('studentmanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/studentmanagements');
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
          StudentmanagementsController,
          mockStudentmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('studentmanagements.view');
          $templateCache.put('modules/studentmanagements/client/views/view-studentmanagement.client.view.html', '');

          // create mock Studentmanagement
          mockStudentmanagement = new StudentmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Studentmanagement Name'
          });

          // Initialize Controller
          StudentmanagementsController = $controller('StudentmanagementsController as vm', {
            $scope: $scope,
            studentmanagementResolve: mockStudentmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:studentmanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.studentmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            studentmanagementId: 1
          })).toEqual('/studentmanagements/1');
        }));

        it('should attach an Studentmanagement to the controller scope', function () {
          expect($scope.vm.studentmanagement._id).toBe(mockStudentmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/studentmanagements/client/views/view-studentmanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          StudentmanagementsController,
          mockStudentmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('studentmanagements.create');
          $templateCache.put('modules/studentmanagements/client/views/form-studentmanagement.client.view.html', '');

          // create mock Studentmanagement
          mockStudentmanagement = new StudentmanagementsService();

          // Initialize Controller
          StudentmanagementsController = $controller('StudentmanagementsController as vm', {
            $scope: $scope,
            studentmanagementResolve: mockStudentmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.studentmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/studentmanagements/create');
        }));

        it('should attach an Studentmanagement to the controller scope', function () {
          expect($scope.vm.studentmanagement._id).toBe(mockStudentmanagement._id);
          expect($scope.vm.studentmanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/studentmanagements/client/views/form-studentmanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          StudentmanagementsController,
          mockStudentmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('studentmanagements.edit');
          $templateCache.put('modules/studentmanagements/client/views/form-studentmanagement.client.view.html', '');

          // create mock Studentmanagement
          mockStudentmanagement = new StudentmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Studentmanagement Name'
          });

          // Initialize Controller
          StudentmanagementsController = $controller('StudentmanagementsController as vm', {
            $scope: $scope,
            studentmanagementResolve: mockStudentmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:studentmanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.studentmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            studentmanagementId: 1
          })).toEqual('/studentmanagements/1/edit');
        }));

        it('should attach an Studentmanagement to the controller scope', function () {
          expect($scope.vm.studentmanagement._id).toBe(mockStudentmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/studentmanagements/client/views/form-studentmanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
