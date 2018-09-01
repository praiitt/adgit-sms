(function () {
  'use strict';

  describe('Onlinetestmanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      OnlinetestmanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _OnlinetestmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      OnlinetestmanagementsService = _OnlinetestmanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('onlinetestmanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/onlinetestmanagements');
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
          OnlinetestmanagementsController,
          mockOnlinetestmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('onlinetestmanagements.view');
          $templateCache.put('modules/onlinetestmanagements/client/views/view-onlinetestmanagement.client.view.html', '');

          // create mock Onlinetestmanagement
          mockOnlinetestmanagement = new OnlinetestmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Onlinetestmanagement Name'
          });

          // Initialize Controller
          OnlinetestmanagementsController = $controller('OnlinetestmanagementsController as vm', {
            $scope: $scope,
            onlinetestmanagementResolve: mockOnlinetestmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:onlinetestmanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.onlinetestmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            onlinetestmanagementId: 1
          })).toEqual('/onlinetestmanagements/1');
        }));

        it('should attach an Onlinetestmanagement to the controller scope', function () {
          expect($scope.vm.onlinetestmanagement._id).toBe(mockOnlinetestmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/onlinetestmanagements/client/views/view-onlinetestmanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          OnlinetestmanagementsController,
          mockOnlinetestmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('onlinetestmanagements.create');
          $templateCache.put('modules/onlinetestmanagements/client/views/form-onlinetestmanagement.client.view.html', '');

          // create mock Onlinetestmanagement
          mockOnlinetestmanagement = new OnlinetestmanagementsService();

          // Initialize Controller
          OnlinetestmanagementsController = $controller('OnlinetestmanagementsController as vm', {
            $scope: $scope,
            onlinetestmanagementResolve: mockOnlinetestmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.onlinetestmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/onlinetestmanagements/create');
        }));

        it('should attach an Onlinetestmanagement to the controller scope', function () {
          expect($scope.vm.onlinetestmanagement._id).toBe(mockOnlinetestmanagement._id);
          expect($scope.vm.onlinetestmanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/onlinetestmanagements/client/views/form-onlinetestmanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          OnlinetestmanagementsController,
          mockOnlinetestmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('onlinetestmanagements.edit');
          $templateCache.put('modules/onlinetestmanagements/client/views/form-onlinetestmanagement.client.view.html', '');

          // create mock Onlinetestmanagement
          mockOnlinetestmanagement = new OnlinetestmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Onlinetestmanagement Name'
          });

          // Initialize Controller
          OnlinetestmanagementsController = $controller('OnlinetestmanagementsController as vm', {
            $scope: $scope,
            onlinetestmanagementResolve: mockOnlinetestmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:onlinetestmanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.onlinetestmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            onlinetestmanagementId: 1
          })).toEqual('/onlinetestmanagements/1/edit');
        }));

        it('should attach an Onlinetestmanagement to the controller scope', function () {
          expect($scope.vm.onlinetestmanagement._id).toBe(mockOnlinetestmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/onlinetestmanagements/client/views/form-onlinetestmanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
