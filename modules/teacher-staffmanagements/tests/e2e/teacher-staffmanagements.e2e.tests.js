'use strict';

describe('Teacher staffmanagements E2E Tests:', function () {
  describe('Test Teacher staffmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/teacher-staffmanagements');
      expect(element.all(by.repeater('teacher-staffmanagement in teacher-staffmanagements')).count()).toEqual(0);
    });
  });
});
