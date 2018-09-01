'use strict';

describe('Attendancemanagements E2E Tests:', function () {
  describe('Test Attendancemanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/attendancemanagements');
      expect(element.all(by.repeater('attendancemanagement in attendancemanagements')).count()).toEqual(0);
    });
  });
});
