'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Admissionmanagements Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/admissionmanagements',
      permissions: '*'
    }, {
      resources: '/api/admissionmanagements/:admissionmanagementId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/admissionmanagements',
      permissions: ['get', 'post']
    }, {
      resources: '/api/admissionmanagements/:admissionmanagementId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/admissionmanagements',
      permissions: ['get']
    }, {
      resources: '/api/admissionmanagements/:admissionmanagementId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Admissionmanagements Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Admissionmanagement is being processed and the current user created it then allow any manipulation
  if (req.admissionmanagement && req.user && req.admissionmanagement.user && req.admissionmanagement.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
