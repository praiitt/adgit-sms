(function () {
  'use strict';

  describe('Gallerymanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      GallerymanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _GallerymanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      GallerymanagementsService = _GallerymanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('gallerymanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/gallerymanagements');
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
          GallerymanagementsController,
          mockGallerymanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('gallerymanagements.view');
          $templateCache.put('modules/gallerymanagements/client/views/view-gallerymanagement.client.view.html', '');

          // create mock Gallerymanagement
          mockGallerymanagement = new GallerymanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Gallerymanagement Name'
          });

          // Initialize Controller
          GallerymanagementsController = $controller('GallerymanagementsController as vm', {
            $scope: $scope,
            gallerymanagementResolve: mockGallerymanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:gallerymanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.gallerymanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            gallerymanagementId: 1
          })).toEqual('/gallerymanagements/1');
        }));

        it('should attach an Gallerymanagement to the controller scope', function () {
          expect($scope.vm.gallerymanagement._id).toBe(mockGallerymanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/gallerymanagements/client/views/view-gallerymanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          GallerymanagementsController,
          mockGallerymanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('gallerymanagements.create');
          $templateCache.put('modules/gallerymanagements/client/views/form-gallerymanagement.client.view.html', '');

          // create mock Gallerymanagement
          mockGallerymanagement = new GallerymanagementsService();

          // Initialize Controller
          GallerymanagementsController = $controller('GallerymanagementsController as vm', {
            $scope: $scope,
            gallerymanagementResolve: mockGallerymanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.gallerymanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/gallerymanagements/create');
        }));

        it('should attach an Gallerymanagement to the controller scope', function () {
          expect($scope.vm.gallerymanagement._id).toBe(mockGallerymanagement._id);
          expect($scope.vm.gallerymanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/gallerymanagements/client/views/form-gallerymanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          GallerymanagementsController,
          mockGallerymanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('gallerymanagements.edit');
          $templateCache.put('modules/gallerymanagements/client/views/form-gallerymanagement.client.view.html', '');

          // create mock Gallerymanagement
          mockGallerymanagement = new GallerymanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Gallerymanagement Name'
          });

          // Initialize Controller
          GallerymanagementsController = $controller('GallerymanagementsController as vm', {
            $scope: $scope,
            gallerymanagementResolve: mockGallerymanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:gallerymanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.gallerymanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            gallerymanagementId: 1
          })).toEqual('/gallerymanagements/1/edit');
        }));

        it('should attach an Gallerymanagement to the controller scope', function () {
          expect($scope.vm.gallerymanagement._id).toBe(mockGallerymanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/gallerymanagements/client/views/form-gallerymanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
