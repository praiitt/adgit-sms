'use strict';

describe('Leavemanagements E2E Tests:', function () {
  describe('Test Leavemanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/leavemanagements');
      expect(element.all(by.repeater('leavemanagement in leavemanagements')).count()).toEqual(0);
    });
  });
});
