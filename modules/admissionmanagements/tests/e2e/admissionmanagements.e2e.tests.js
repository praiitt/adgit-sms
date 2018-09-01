'use strict';

describe('Admissionmanagements E2E Tests:', function () {
  describe('Test Admissionmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/admissionmanagements');
      expect(element.all(by.repeater('admissionmanagement in admissionmanagements')).count()).toEqual(0);
    });
  });
});
