const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  estimatedTime: { type: String, required: true },
  prerequisites: [{ type: String }],
  skills: [{
    name: { type: String, required: true },
    description: { type: String },
    resources: [{
      title: { type: String },
      url: { type: String },
      type: { type: String, enum: ['video', 'article', 'book', 'course'] }
    }],
    projects: [{ type: String }],
    order: { type: Number, required: true }
  }],
  tags: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Roadmap', roadmapSchema);