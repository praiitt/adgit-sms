(function () {
  'use strict';

  describe('Onlinetestmanagements List Controller Tests', function () {
    // Initialize global variables
    var OnlinetestmanagementsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      OnlinetestmanagementsService,
      mockOnlinetestmanagement;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _OnlinetestmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      OnlinetestmanagementsService = _OnlinetestmanagementsService_;

      // create mock article
      mockOnlinetestmanagement = new OnlinetestmanagementsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Onlinetestmanagement Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Onlinetestmanagements List controller.
      OnlinetestmanagementsListController = $controller('OnlinetestmanagementsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockOnlinetestmanagementList;

      beforeEach(function () {
        mockOnlinetestmanagementList = [mockOnlinetestmanagement, mockOnlinetestmanagement];
      });

      it('should send a GET request and return all Onlinetestmanagements', inject(function (OnlinetestmanagementsService) {
        // Set POST response
        $httpBackend.expectGET('api/onlinetestmanagements').respond(mockOnlinetestmanagementList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.onlinetestmanagements.length).toEqual(2);
        expect($scope.vm.onlinetestmanagements[0]).toEqual(mockOnlinetestmanagement);
        expect($scope.vm.onlinetestmanagements[1]).toEqual(mockOnlinetestmanagement);

      }));
    });
  });
}());
