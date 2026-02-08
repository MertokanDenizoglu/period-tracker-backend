const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  deviceId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  name: { type: String, trim: true },
  age: { type: Number },
  isPremium: { type: Boolean, default: false },
  
  email: { 
    type: String, 
    trim: true, 
    lowercase: true,
    unique: true, 
    sparse: true 
  },
  password: { 
    type: String,
    select: false 
  },
  pushToken: { type: String },
  
  firstOpenDate: { type: Date, default: Date.now },
  lastSync: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);