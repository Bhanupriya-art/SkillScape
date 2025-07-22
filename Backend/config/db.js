const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillscape', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
  w: 'majority'
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('📡 MongoDB disconnected');
});

module.exports = connectDB;