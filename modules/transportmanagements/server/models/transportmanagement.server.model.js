'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Transportmanagement Schema

var TransportmanagementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Transportmanagement name',
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

mongoose.model('Transportmanagement', TransportmanagementSchema);
 */


var TransportRecords = new Schema({
  transport_id: {
    type: Number
  },
  vehicle_no: {
    type: Number
  },
  routes_details_id: {
    type: Number
  },
  start_place: {
    type: String
  },
  end_place: {
    type: String
  },
  kms: {
    type: Number
  },
  route_timing: {
    type: Number
  }
  });
  
  mongoose.model('Transportmanagement', TransportRecords);