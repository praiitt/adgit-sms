'use strict';

describe('Studentmanagements E2E Tests:', function () {
  describe('Test Studentmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/studentmanagements');
      expect(element.all(by.repeater('studentmanagement in studentmanagements')).count()).toEqual(0);
    });
  });
});
