'use strict';

describe('Gallerymanagements E2E Tests:', function () {
  describe('Test Gallerymanagements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/gallerymanagements');
      expect(element.all(by.repeater('gallerymanagement in gallerymanagements')).count()).toEqual(0);
    });
  });
});
