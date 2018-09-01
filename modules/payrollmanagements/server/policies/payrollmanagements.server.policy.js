'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Payrollmanagements Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/payrollmanagements',
      permissions: '*'
    }, {
      resources: '/api/payrollmanagements/:payrollmanagementId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/payrollmanagements',
      permissions: ['get', 'post']
    }, {
      resources: '/api/payrollmanagements/:payrollmanagementId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/payrollmanagements',
      permissions: ['get']
    }, {
      resources: '/api/payrollmanagements/:payrollmanagementId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Payrollmanagements Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Payrollmanagement is being processed and the current user created it then allow any manipulation
  if (req.payrollmanagement && req.user && req.payrollmanagement.user && req.payrollmanagement.user.id === req.user.id) {
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
