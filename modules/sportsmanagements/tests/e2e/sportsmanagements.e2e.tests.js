'use strict';

describe('Sportsmanagements E2E Tests:', function () {
  describe('Test Sportsmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/sportsmanagements');
      expect(element.all(by.repeater('sportsmanagement in sportsmanagements')).count()).toEqual(0);
    });
  });
});
