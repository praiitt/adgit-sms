'use strict';

describe('Routinemanagements E2E Tests:', function () {
  describe('Test Routinemanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/routinemanagements');
      expect(element.all(by.repeater('routinemanagement in routinemanagements')).count()).toEqual(0);
    });
  });
});
