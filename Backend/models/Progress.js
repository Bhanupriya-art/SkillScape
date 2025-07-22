const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true },
  completedSkills: [{ type: String }],
  currentSkill: { type: String },
  progressPercentage: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  notes: [{ 
    skillName: String, 
    note: String, 
    createdAt: { type: Date, default: Date.now } 
  }],
});

module.exports = mongoose.model('Progress', progressSchema);