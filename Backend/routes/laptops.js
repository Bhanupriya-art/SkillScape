const express = require('express');
const router = express.Router();
const {
  getAllLaptops,
  getLaptopById,
  getRecommendations,
  createLaptop
} = require('../controllers/laptops');
const authenticateToken = require('../middleware/auth');

router.get('/', getAllLaptops);
router.get('/:id', getLaptopById);
router.post('/recommend', getRecommendations);
router.post('/', authenticateToken, createLaptop);

module.exports = router;