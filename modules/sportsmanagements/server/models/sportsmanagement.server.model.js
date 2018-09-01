'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Sportsmanagement Schema

var SportsmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Sportsmanagement name',
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

mongoose.model('Sportsmanagement', SportsmanagementSchema);
 */


var SportsEvent = new Schema({
  sportsevent_id: {
    type: Number
  },
  sportsevent_name: {
    type: String
  },
  start_at: {
    type: String
  },
  prize_type: {
    type: String
  },
  participants_id: {
    type: Number
  },
  winner_ids: {
    type: Number
  },
  prize_cost: {
    type: Number
  },
  organiser: {
    type: String
  },
  created_by: {
    type: String
  },
  end_at: {
    type: String 
  }
  });
  
  mongoose.model('Sportsmanagement', SportsEvent);