'use strict';

describe('Transportmanagements E2E Tests:', function () {
  describe('Test Transportmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/transportmanagements');
      expect(element.all(by.repeater('transportmanagement in transportmanagements')).count()).toEqual(0);
    });
  });
});
