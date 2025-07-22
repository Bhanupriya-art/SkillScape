const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  processor: { type: String, required: true },
  ram: { type: String, required: true },
  storage: { type: String, required: true },
  graphics: { type: String },
  display: { type: String },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  category: { type: String, enum: ['Budget', 'Mid-range', 'Premium', 'Gaming', 'Professional'] },
  suitableFor: [{ type: String }],
  pros: [{ type: String }],
  cons: [{ type: String }],
  rating: { type: Number, min: 0, max: 5 },
  amazonLink: { type: String },
  flipkartLink: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Laptop', laptopSchema);