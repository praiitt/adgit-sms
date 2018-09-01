'use strict';

describe('Notificationmanagements E2E Tests:', function () {
  describe('Test Notificationmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/notificationmanagements');
      expect(element.all(by.repeater('notificationmanagement in notificationmanagements')).count()).toEqual(0);
    });
  });
});
