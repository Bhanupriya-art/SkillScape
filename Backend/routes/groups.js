const express = require('express');
const router = express.Router();
const {
  getAllGroups,
  getGroupById,
  createGroup,
  joinGroup,
  leaveGroup,
  sendMessage,
  getJoinedGroups
} = require('../controllers/groups');
const authenticateToken = require('../middleware/auth');

router.get('/', getAllGroups);
router.get('/:id', authenticateToken, getGroupById);
router.post('/', authenticateToken, createGroup);
router.post('/:id/join', authenticateToken, joinGroup);
router.post('/:id/leave', authenticateToken, leaveGroup);
router.post('/:id/messages', authenticateToken, sendMessage);
router.get('/my/joined', authenticateToken, getJoinedGroups);

module.exports = router;