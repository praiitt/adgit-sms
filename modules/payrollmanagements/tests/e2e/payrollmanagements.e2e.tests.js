'use strict';

describe('Payrollmanagements E2E Tests:', function () {
  describe('Test Payrollmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/payrollmanagements');
      expect(element.all(by.repeater('payrollmanagement in payrollmanagements')).count()).toEqual(0);
    });
  });
});
