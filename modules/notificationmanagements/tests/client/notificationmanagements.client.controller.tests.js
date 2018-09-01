(function () {
  'use strict';

  describe('Notificationmanagements Controller Tests', function () {
    // Initialize global variables
    var NotificationmanagementsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      NotificationmanagementsService,
      mockNotificationmanagement;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _NotificationmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      NotificationmanagementsService = _NotificationmanagementsService_;

      // create mock Notificationmanagement
      mockNotificationmanagement = new NotificationmanagementsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Notificationmanagement Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Notificationmanagements controller.
      NotificationmanagementsController = $controller('NotificationmanagementsController as vm', {
        $scope: $scope,
        notificationmanagementResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleNotificationmanagementPostData;

      beforeEach(function () {
        // Create a sample Notificationmanagement object
        sampleNotificationmanagementPostData = new NotificationmanagementsService({
          name: 'Notificationmanagement Name'
        });

        $scope.vm.notificationmanagement = sampleNotificationmanagementPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (NotificationmanagementsService) {
        // Set POST response
        $httpBackend.expectPOST('api/notificationmanagements', sampleNotificationmanagementPostData).respond(mockNotificationmanagement);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Notificationmanagement was created
        expect($state.go).toHaveBeenCalledWith('notificationmanagements.view', {
          notificationmanagementId: mockNotificationmanagement._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/notificationmanagements', sampleNotificationmanagementPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Notificationmanagement in $scope
        $scope.vm.notificationmanagement = mockNotificationmanagement;
      });

      it('should update a valid Notificationmanagement', inject(function (NotificationmanagementsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/notificationmanagements\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('notificationmanagements.view', {
          notificationmanagementId: mockNotificationmanagement._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (NotificationmanagementsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/notificationmanagements\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Notificationmanagements
        $scope.vm.notificationmanagement = mockNotificationmanagement;
      });

      it('should delete the Notificationmanagement and redirect to Notificationmanagements', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/notificationmanagements\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('notificationmanagements.list');
      });

      it('should should not delete the Notificationmanagement and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
