const Roadmap = require('../models/Roadmap');

exports.getAllRoadmaps = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const roadmaps = await Roadmap.find(filter)
      .populate('createdBy', 'username fullName')
      .sort({ createdAt: -1 });

    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
      .populate('createdBy', 'username fullName');

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createRoadmap = async (req, res) => {
  try {
    const roadmap = new Roadmap({
      ...req.body,
      createdBy: req.user.userId
    });

    await roadmap.save();
    await roadmap.populate('createdBy', 'username fullName');

    res.status(201).json({
      message: 'Roadmap created successfully',
      roadmap
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found or unauthorized' });
    }

    Object.assign(roadmap, req.body);
    await roadmap.save();
    await roadmap.populate('createdBy', 'username fullName');

    res.json({ message: 'Roadmap updated successfully', roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found or unauthorized' });
    }

    await roadmap.deleteOne();
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};