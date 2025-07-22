const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  college: { type: String },
  year: { type: String },
  branch: { type: String },
  goals: [{ type: String }],
  completedSkills: [{ type: String }],
  profilePicture: { type: String },
  joinedGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup' }],
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);