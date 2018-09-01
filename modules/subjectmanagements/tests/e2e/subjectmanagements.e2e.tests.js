'use strict';

describe('Subjectmanagements E2E Tests:', function () {
  describe('Test Subjectmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/subjectmanagements');
      expect(element.all(by.repeater('subjectmanagement in subjectmanagements')).count()).toEqual(0);
    });
  });
});
