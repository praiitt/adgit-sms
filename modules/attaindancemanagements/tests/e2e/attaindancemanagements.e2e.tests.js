'use strict';

describe('Attaindancemanagements E2E Tests:', function () {
  describe('Test Attaindancemanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/attaindancemanagements');
      expect(element.all(by.repeater('attaindancemanagement in attaindancemanagements')).count()).toEqual(0);
    });
  });
});
