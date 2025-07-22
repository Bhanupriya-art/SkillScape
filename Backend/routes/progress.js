const express = require('express');
const router = express.Router();
const {
  getUserProgress,
  updateProgress,
  addNote,
  getAllProgress
} = require('../controllers/progress');
const authenticateToken = require('../middleware/auth');

router.get('/:roadmapId', authenticateToken, getUserProgress);
router.post('/:roadmapId', authenticateToken, updateProgress);
router.post('/:roadmapId/notes', authenticateToken, addNote);
router.get('/', authenticateToken, getAllProgress);

module.exports = router;