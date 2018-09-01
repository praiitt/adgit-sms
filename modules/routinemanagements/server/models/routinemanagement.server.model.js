'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Routinemanagement Schema

var RoutinemanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Routinemanagement name',
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

mongoose.model('Routinemanagement', RoutinemanagementSchema);
*/

var Routinemanagement = new Schema({
  routine_id: {
    type: Number
  },
  routine_name: {
    type: String
  },
  teacherstaff_assigned_id: {
    type: String
  },
  subject_id: {
    type: Number
  },
  routine_type: {
    type: String
  },
  assigned_to_class: {
    type: Number
  }
  });
  
  mongoose.model('Routinemanagement', Routinemanagement);