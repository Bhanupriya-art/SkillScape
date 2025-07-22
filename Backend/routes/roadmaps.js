const express = require('express');
const router = express.Router();
const {
  getAllRoadmaps,
  getRoadmapById,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap
} = require('../controllers/roadmaps');
const authenticateToken = require('../middleware/auth');

router.get('/', getAllRoadmaps);
router.get('/:id', getRoadmapById);
router.post('/', authenticateToken, createRoadmap);
router.put('/:id', authenticateToken, updateRoadmap);
router.delete('/:id', authenticateToken, deleteRoadmap);

module.exports = router;