(function () {
  'use strict';

  describe('Documentmanagements List Controller Tests', function () {
    // Initialize global variables
    var DocumentmanagementsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      DocumentmanagementsService,
      mockDocumentmanagement;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _DocumentmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      DocumentmanagementsService = _DocumentmanagementsService_;

      // create mock article
      mockDocumentmanagement = new DocumentmanagementsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Documentmanagement Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Documentmanagements List controller.
      DocumentmanagementsListController = $controller('DocumentmanagementsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockDocumentmanagementList;

      beforeEach(function () {
        mockDocumentmanagementList = [mockDocumentmanagement, mockDocumentmanagement];
      });

      it('should send a GET request and return all Documentmanagements', inject(function (DocumentmanagementsService) {
        // Set POST response
        $httpBackend.expectGET('api/documentmanagements').respond(mockDocumentmanagementList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.documentmanagements.length).toEqual(2);
        expect($scope.vm.documentmanagements[0]).toEqual(mockDocumentmanagement);
        expect($scope.vm.documentmanagements[1]).toEqual(mockDocumentmanagement);

      }));
    });
  });
}());
