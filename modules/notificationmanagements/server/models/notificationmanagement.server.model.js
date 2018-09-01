'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Notificationmanagement Schema

var NotificationmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Notificationmanagement name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Notificationmanagement', NotificationmanagementSchema);
 */

var SchoolNotification = new Schema({
  notification_id: {
    type: Number
      },
  notification_name: {
    type: String
  },
  notification_type: {
    type: String
  },
  notification_delivery_at: {
    type: Number
      },
  notification_delivery_type: {
    type: String
  },
  delivery_from: {
    type: String
  },
  delivery_to: {
    type: String
      },
  notification_content: {
    type: String
  },
  notification_status: {
    type: String
  },
});

mongoose.model('Notificationmanagement', SchoolNotification);
