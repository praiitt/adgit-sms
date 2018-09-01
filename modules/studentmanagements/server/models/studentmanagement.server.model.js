'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Studentmanagement Schema

var StudentmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Studentmanagement name',
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

mongoose.model('Studentmanagement', StudentmanagementSchema);
 */

var StudentRecord = new Schema({
  student_id: {
    type: Number
  },
  admission_id: {
    type: Number
  },
  routine_id: {
    type: Number
  },
  galery_id: {
    type: Date
  },
  event_id: {
    type: Number
  },
  tutorial_id: {
    type: Number
  },
  admission_status: {
    type: Boolean
  },
  admission_for: {
    type: String
  },
  admission_compaign_name: {
    type: String
  },
  is_test_req: {
    type: Boolean
  },
  test_id: {
    type: Number
  },
  transport_id: {
    type: Number
  }

  });
  
  mongoose.model('Studentmanagement', StudentRecord);