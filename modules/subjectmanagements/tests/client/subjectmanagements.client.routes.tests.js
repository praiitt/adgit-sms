(function () {
  'use strict';

  describe('Subjectmanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      SubjectmanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SubjectmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SubjectmanagementsService = _SubjectmanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('subjectmanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/subjectmanagements');
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
          SubjectmanagementsController,
          mockSubjectmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('subjectmanagements.view');
          $templateCache.put('modules/subjectmanagements/client/views/view-subjectmanagement.client.view.html', '');

          // create mock Subjectmanagement
          mockSubjectmanagement = new SubjectmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Subjectmanagement Name'
          });

          // Initialize Controller
          SubjectmanagementsController = $controller('SubjectmanagementsController as vm', {
            $scope: $scope,
            subjectmanagementResolve: mockSubjectmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:subjectmanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.subjectmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            subjectmanagementId: 1
          })).toEqual('/subjectmanagements/1');
        }));

        it('should attach an Subjectmanagement to the controller scope', function () {
          expect($scope.vm.subjectmanagement._id).toBe(mockSubjectmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/subjectmanagements/client/views/view-subjectmanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SubjectmanagementsController,
          mockSubjectmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('subjectmanagements.create');
          $templateCache.put('modules/subjectmanagements/client/views/form-subjectmanagement.client.view.html', '');

          // create mock Subjectmanagement
          mockSubjectmanagement = new SubjectmanagementsService();

          // Initialize Controller
          SubjectmanagementsController = $controller('SubjectmanagementsController as vm', {
            $scope: $scope,
            subjectmanagementResolve: mockSubjectmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.subjectmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/subjectmanagements/create');
        }));

        it('should attach an Subjectmanagement to the controller scope', function () {
          expect($scope.vm.subjectmanagement._id).toBe(mockSubjectmanagement._id);
          expect($scope.vm.subjectmanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/subjectmanagements/client/views/form-subjectmanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SubjectmanagementsController,
          mockSubjectmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('subjectmanagements.edit');
          $templateCache.put('modules/subjectmanagements/client/views/form-subjectmanagement.client.view.html', '');

          // create mock Subjectmanagement
          mockSubjectmanagement = new SubjectmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Subjectmanagement Name'
          });

          // Initialize Controller
          SubjectmanagementsController = $controller('SubjectmanagementsController as vm', {
            $scope: $scope,
            subjectmanagementResolve: mockSubjectmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:subjectmanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.subjectmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            subjectmanagementId: 1
          })).toEqual('/subjectmanagements/1/edit');
        }));

        it('should attach an Subjectmanagement to the controller scope', function () {
          expect($scope.vm.subjectmanagement._id).toBe(mockSubjectmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/subjectmanagements/client/views/form-subjectmanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
