'use strict';

describe('Documentmanagements E2E Tests:', function () {
  describe('Test Documentmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/documentmanagements');
      expect(element.all(by.repeater('documentmanagement in documentmanagements')).count()).toEqual(0);
    });
  });
});
