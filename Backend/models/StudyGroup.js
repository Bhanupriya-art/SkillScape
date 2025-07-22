const mongoose = require('mongoose');

const studyGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxMembers: { type: Number, default: 50 },
  isPrivate: { type: Boolean, default: false },
  tags: [{ type: String }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudyGroup', studyGroupSchema);