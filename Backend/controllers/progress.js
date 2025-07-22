const Progress = require('../models/Progress');
const Roadmap = require('../models/Roadmap');

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user.userId,
      roadmapId: req.params.roadmapId
    }).populate('roadmapId');

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({
      userId: req.user.userId,
      roadmapId: req.params.roadmapId
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user.userId,
        roadmapId: req.params.roadmapId,
        currentSkill: req.body.currentSkill || '',
        completedSkills: req.body.completedSkills || []
      });
    } else {
      progress.completedSkills = req.body.completedSkills || progress.completedSkills;
      progress.currentSkill = req.body.currentSkill || progress.currentSkill;
      progress.lastUpdated = new Date();
    }

    const roadmap = await Roadmap.findById(req.params.roadmapId);
    if (roadmap) {
      progress.progressPercentage = Math.round(
        (progress.completedSkills.length / roadmap.skills.length) * 100
      );
    }

    await progress.save();
    res.json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { skillName, note } = req.body;
    
    const progress = await Progress.findOne({
      userId: req.user.userId,
      roadmapId: req.params.roadmapId
    });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    progress.notes.push({ skillName, note });
    await progress.save();

    res.json({ message: 'Note added successfully', progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.userId })
      .populate('roadmapId')
      .sort({ lastUpdated: -1 });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};