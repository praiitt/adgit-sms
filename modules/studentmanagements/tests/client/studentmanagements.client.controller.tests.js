(function () {
  'use strict';

  describe('Studentmanagements Controller Tests', function () {
    // Initialize global variables
    var StudentmanagementsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      StudentmanagementsService,
      mockStudentmanagement;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _StudentmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      StudentmanagementsService = _StudentmanagementsService_;

      // create mock Studentmanagement
      mockStudentmanagement = new StudentmanagementsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Studentmanagement Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Studentmanagements controller.
      StudentmanagementsController = $controller('StudentmanagementsController as vm', {
        $scope: $scope,
        studentmanagementResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleStudentmanagementPostData;

      beforeEach(function () {
        // Create a sample Studentmanagement object
        sampleStudentmanagementPostData = new StudentmanagementsService({
          name: 'Studentmanagement Name'
        });

        $scope.vm.studentmanagement = sampleStudentmanagementPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (StudentmanagementsService) {
        // Set POST response
        $httpBackend.expectPOST('api/studentmanagements', sampleStudentmanagementPostData).respond(mockStudentmanagement);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Studentmanagement was created
        expect($state.go).toHaveBeenCalledWith('studentmanagements.view', {
          studentmanagementId: mockStudentmanagement._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/studentmanagements', sampleStudentmanagementPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Studentmanagement in $scope
        $scope.vm.studentmanagement = mockStudentmanagement;
      });

      it('should update a valid Studentmanagement', inject(function (StudentmanagementsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/studentmanagements\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('studentmanagements.view', {
          studentmanagementId: mockStudentmanagement._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (StudentmanagementsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/studentmanagements\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Studentmanagements
        $scope.vm.studentmanagement = mockStudentmanagement;
      });

      it('should delete the Studentmanagement and redirect to Studentmanagements', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/studentmanagements\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('studentmanagements.list');
      });

      it('should should not delete the Studentmanagement and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
