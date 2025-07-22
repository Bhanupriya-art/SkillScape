const Laptop = require('../models/Laptop');

exports.getAllLaptops = async (req, res) => {
  try {
    const { 
      category, 
      minPrice, 
      maxPrice, 
      suitableFor, 
      search,
      sortBy = 'price',
      sortOrder = 'asc'
    } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (suitableFor) filter.suitableFor = { $in: [suitableFor] };
    if (search) {
      filter.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { processor: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const laptops = await Laptop.find(filter).sort(sortOptions);

    res.json(laptops);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getLaptopById = async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);

    if (!laptop) {
      return res.status(404).json({ message: 'Laptop not found' });
    }

    res.json(laptop);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const { budget, usage, preferences = {} } = req.body;
    
    let filter = {};
    
    if (budget) {
      filter.price = { $lte: budget };
    }
    
    if (usage && usage.length > 0) {
      filter.suitableFor = { $in: usage };
    }
    
    if (preferences.category) {
      filter.category = preferences.category;
    }
    
    const recommendations = await Laptop.find(filter)
      .sort({ rating: -1, price: 1 })
      .limit(10);
    
    res.json({
      message: 'Recommendations generated successfully',
      recommendations,
      totalFound: recommendations.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createLaptop = async (req, res) => {
  try {
    const laptop = new Laptop(req.body);
    await laptop.save();

    res.status(201).json({
      message: 'Laptop added successfully',
      laptop
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};