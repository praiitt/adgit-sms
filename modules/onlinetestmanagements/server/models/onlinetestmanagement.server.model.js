'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Onlinetestmanagement Schema

var OnlinetestmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Onlinetestmanagement name',
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

mongoose.model('Onlinetestmanagement', OnlinetestmanagementSchema);
 */

var TestManagement = new Schema({
  test_id: {
    type: Number
  },
  test_name: {
    type: String
  },
  test_for_class: {
    type: String
  },
  test_difficulty_level: {
    type: Number
  },
  question_paper_doc_url: {
    type: String
  },
  online_links_url: {
    type: String
  },
  passing_marks: {
    type: Number
  },
  max_marks: {
    type: Number
  },
  test_type: {
    type: String
  },
  test_duration: {
    type: String
  },
  teacher_assigned: {
    type: String
  },
  test_created_by: {
    type: String
  },
  last_edited_by: {
    type: String
  }
  });
  
  mongoose.model('Onlinetestmanagement', TestManagement);
