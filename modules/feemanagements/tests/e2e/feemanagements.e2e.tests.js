'use strict';

describe('Feemanagements E2E Tests:', function () {
  describe('Test Feemanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/feemanagements');
      expect(element.all(by.repeater('feemanagement in feemanagements')).count()).toEqual(0);
    });
  });
});
