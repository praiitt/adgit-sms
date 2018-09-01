'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Staffmanagement Schema
 */
var PersonSchema = new Schema({
  fisrt_name: {
    type: String
  },
  middle_name:{
    type:String
  },
  last_name:{
    type:String
  },
  created: {
    type: Date,
    default: Date.now
  },
  age:{
    type:Number
  },
  sex :{
    type:String
  },
  address:{
    type:String
  },
  dob:{
    type:Date
  },
  contact_no:{
    type:Number
  },
  aadhar_no:{
    type:Number
  },
  email_id:{
    type:String
  },
  blood_group:{ 
    type:String
  },
  caste:{
    type:String
  },
  religion:{
    type:String
  },
  nationality:{
    type:String
  },
  maritial_status:{
    type:String
  }
});

mongoose.model('Person', PersonSchema);