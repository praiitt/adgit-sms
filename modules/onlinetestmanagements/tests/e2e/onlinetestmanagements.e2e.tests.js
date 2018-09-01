'use strict';

describe('Onlinetestmanagements E2E Tests:', function () {
  describe('Test Onlinetestmanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/onlinetestmanagements');
      expect(element.all(by.repeater('onlinetestmanagement in onlinetestmanagements')).count()).toEqual(0);
    });
  });
});
