(function () {
  'use strict';

  describe('Transportmanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      TransportmanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TransportmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TransportmanagementsService = _TransportmanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('transportmanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/transportmanagements');
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
          TransportmanagementsController,
          mockTransportmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('transportmanagements.view');
          $templateCache.put('modules/transportmanagements/client/views/view-transportmanagement.client.view.html', '');

          // create mock Transportmanagement
          mockTransportmanagement = new TransportmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Transportmanagement Name'
          });

          // Initialize Controller
          TransportmanagementsController = $controller('TransportmanagementsController as vm', {
            $scope: $scope,
            transportmanagementResolve: mockTransportmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:transportmanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.transportmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            transportmanagementId: 1
          })).toEqual('/transportmanagements/1');
        }));

        it('should attach an Transportmanagement to the controller scope', function () {
          expect($scope.vm.transportmanagement._id).toBe(mockTransportmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/transportmanagements/client/views/view-transportmanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TransportmanagementsController,
          mockTransportmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('transportmanagements.create');
          $templateCache.put('modules/transportmanagements/client/views/form-transportmanagement.client.view.html', '');

          // create mock Transportmanagement
          mockTransportmanagement = new TransportmanagementsService();

          // Initialize Controller
          TransportmanagementsController = $controller('TransportmanagementsController as vm', {
            $scope: $scope,
            transportmanagementResolve: mockTransportmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.transportmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/transportmanagements/create');
        }));

        it('should attach an Transportmanagement to the controller scope', function () {
          expect($scope.vm.transportmanagement._id).toBe(mockTransportmanagement._id);
          expect($scope.vm.transportmanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/transportmanagements/client/views/form-transportmanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TransportmanagementsController,
          mockTransportmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('transportmanagements.edit');
          $templateCache.put('modules/transportmanagements/client/views/form-transportmanagement.client.view.html', '');

          // create mock Transportmanagement
          mockTransportmanagement = new TransportmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Transportmanagement Name'
          });

          // Initialize Controller
          TransportmanagementsController = $controller('TransportmanagementsController as vm', {
            $scope: $scope,
            transportmanagementResolve: mockTransportmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:transportmanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.transportmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            transportmanagementId: 1
          })).toEqual('/transportmanagements/1/edit');
        }));

        it('should attach an Transportmanagement to the controller scope', function () {
          expect($scope.vm.transportmanagement._id).toBe(mockTransportmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/transportmanagements/client/views/form-transportmanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
