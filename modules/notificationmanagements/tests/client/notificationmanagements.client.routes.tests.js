(function () {
  'use strict';

  describe('Notificationmanagements Route Tests', function () {
    // Initialize global variables
    var $scope,
      NotificationmanagementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _NotificationmanagementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      NotificationmanagementsService = _NotificationmanagementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('notificationmanagements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/notificationmanagements');
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
          NotificationmanagementsController,
          mockNotificationmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('notificationmanagements.view');
          $templateCache.put('modules/notificationmanagements/client/views/view-notificationmanagement.client.view.html', '');

          // create mock Notificationmanagement
          mockNotificationmanagement = new NotificationmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Notificationmanagement Name'
          });

          // Initialize Controller
          NotificationmanagementsController = $controller('NotificationmanagementsController as vm', {
            $scope: $scope,
            notificationmanagementResolve: mockNotificationmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:notificationmanagementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.notificationmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            notificationmanagementId: 1
          })).toEqual('/notificationmanagements/1');
        }));

        it('should attach an Notificationmanagement to the controller scope', function () {
          expect($scope.vm.notificationmanagement._id).toBe(mockNotificationmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/notificationmanagements/client/views/view-notificationmanagement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          NotificationmanagementsController,
          mockNotificationmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('notificationmanagements.create');
          $templateCache.put('modules/notificationmanagements/client/views/form-notificationmanagement.client.view.html', '');

          // create mock Notificationmanagement
          mockNotificationmanagement = new NotificationmanagementsService();

          // Initialize Controller
          NotificationmanagementsController = $controller('NotificationmanagementsController as vm', {
            $scope: $scope,
            notificationmanagementResolve: mockNotificationmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.notificationmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/notificationmanagements/create');
        }));

        it('should attach an Notificationmanagement to the controller scope', function () {
          expect($scope.vm.notificationmanagement._id).toBe(mockNotificationmanagement._id);
          expect($scope.vm.notificationmanagement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/notificationmanagements/client/views/form-notificationmanagement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          NotificationmanagementsController,
          mockNotificationmanagement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('notificationmanagements.edit');
          $templateCache.put('modules/notificationmanagements/client/views/form-notificationmanagement.client.view.html', '');

          // create mock Notificationmanagement
          mockNotificationmanagement = new NotificationmanagementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Notificationmanagement Name'
          });

          // Initialize Controller
          NotificationmanagementsController = $controller('NotificationmanagementsController as vm', {
            $scope: $scope,
            notificationmanagementResolve: mockNotificationmanagement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:notificationmanagementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.notificationmanagementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            notificationmanagementId: 1
          })).toEqual('/notificationmanagements/1/edit');
        }));

        it('should attach an Notificationmanagement to the controller scope', function () {
          expect($scope.vm.notificationmanagement._id).toBe(mockNotificationmanagement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/notificationmanagements/client/views/form-notificationmanagement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
