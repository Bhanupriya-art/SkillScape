const StudyGroup = require('../models/StudyGroup');
const User = require('../models/User');

exports.getAllGroups = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = { isPrivate: false };

    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] }},
      ];
    }

    const groups = await StudyGroup.find(filter)
      .populate('createdBy', 'username fullName')
      .populate('members', 'username fullName')
      .sort({ createdAt: -1 });

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await StudyGroup.findById(req.params.id)
      .populate('createdBy', 'username fullName profilePicture')
      .populate('members', 'username fullName profilePicture')
      .populate('messages.sender', 'username fullName profilePicture');

    if (!group) {
      return res.status(404).json({ message: 'Study group not found' });
    }

    const isMember = group.members.some(member => 
      member._id.toString() === req.user.userId
    );

    if (group.isPrivate && !isMember) {
      return res.status(403).json({ message: 'Access denied. Private group.' });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const group = new StudyGroup({
      ...req.body,
      createdBy: req.user.userId,
      members: [req.user.userId]
    });

    await group.save();
    await group.populate('createdBy', 'username fullName');
    await group.populate('members', 'username fullName');

    await User.findByIdAndUpdate(req.user.userId, {
      $push: { joinedGroups: group._id }
    });

    res.status(201).json({
      message: 'Study group created successfully',
      group
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const group = await StudyGroup.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Study group not found' });
    }

    if (group.members.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already a member of this group' });
    }

    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({ message: 'Group is full' });
    }

    group.members.push(req.user.userId);
    await group.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $push: { joinedGroups: group._id }
    });

    await group.populate('members', 'username fullName');

    res.json({ message: 'Joined group successfully', group });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const group = await StudyGroup.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Study group not found' });
    }

    if (!group.members.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Not a member of this group' });
    }

    group.members = group.members.filter(
      memberId => memberId.toString() !== req.user.userId
    );
    await group.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { joinedGroups: group._id }
    });

    res.json({ message: 'Left group successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const group = await StudyGroup.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Study group not found' });
    }

    if (!group.members.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Not a member of this group' });
    }

    group.messages.push({
      sender: req.user.userId,
      message: message
    });

    await group.save();
    await group.populate('messages.sender', 'username fullName profilePicture');

    const newMessage = group.messages[group.messages.length - 1];

    res.json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getJoinedGroups = async (req, res) => {
  try {
    const groups = await StudyGroup.find({ members: req.user.userId })
      .populate('createdBy', 'username fullName')
      .populate('members', 'username fullName')
      .sort({ createdAt: -1 });

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};