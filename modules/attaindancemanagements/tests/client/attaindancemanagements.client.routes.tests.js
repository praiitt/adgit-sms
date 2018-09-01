(function () {
  'use strict';

  describe('Attaindancemanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      AttaindancemanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AttaindancemanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AttaindancemanagementsService = _AttaindancemanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('attaindancemanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/attaindancemanagements');
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
          AttaindancemanagementsController,
          mockAttaindancemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('attaindancemanagements.view');
          $templateCache.put('modules/attaindancemanagements/client/views/view-attaindancemanagement.client.view.html', '');

          // create mock Attaindancemanagement
          mockAttaindancemanagement = new AttaindancemanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Attaindancemanagement Name'
          });

          // Initialize Controller
          AttaindancemanagementsController = $controller('AttaindancemanagementsController as vm', {
            $scope: $scope,
            attaindancemanagementResolve: mockAttaindancemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:attaindancemanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.attaindancemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            attaindancemanagementId: 1
          })).toEqual('/attaindancemanagements/1');
        }));

        it('should attach an Attaindancemanagement to the controller scope', function () {
          expect($scope.vm.attaindancemanagement._id).toBe(mockAttaindancemanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/attaindancemanagements/client/views/view-attaindancemanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AttaindancemanagementsController,
          mockAttaindancemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('attaindancemanagements.create');
          $templateCache.put('modules/attaindancemanagements/client/views/form-attaindancemanagement.client.view.html', '');

          // create mock Attaindancemanagement
          mockAttaindancemanagement = new AttaindancemanagementsService();

          // Initialize Controller
          AttaindancemanagementsController = $controller('AttaindancemanagementsController as vm', {
            $scope: $scope,
            attaindancemanagementResolve: mockAttaindancemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.attaindancemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/attaindancemanagements/create');
        }));

        it('should attach an Attaindancemanagement to the controller scope', function () {
          expect($scope.vm.attaindancemanagement._id).toBe(mockAttaindancemanagement._id);
          expect($scope.vm.attaindancemanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/attaindancemanagements/client/views/form-attaindancemanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AttaindancemanagementsController,
          mockAttaindancemanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('attaindancemanagements.edit');
          $templateCache.put('modules/attaindancemanagements/client/views/form-attaindancemanagement.client.view.html', '');

          // create mock Attaindancemanagement
          mockAttaindancemanagement = new AttaindancemanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Attaindancemanagement Name'
          });

          // Initialize Controller
          AttaindancemanagementsController = $controller('AttaindancemanagementsController as vm', {
            $scope: $scope,
            attaindancemanagementResolve: mockAttaindancemanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:attaindancemanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.attaindancemanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            attaindancemanagementId: 1
          })).toEqual('/attaindancemanagements/1/edit');
        }));

        it('should attach an Attaindancemanagement to the controller scope', function () {
          expect($scope.vm.attaindancemanagement._id).toBe(mockAttaindancemanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/attaindancemanagements/client/views/form-attaindancemanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
