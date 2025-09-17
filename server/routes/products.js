const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Default products for when MongoDB is not available
const defaultProducts = [
  // Paper Products
  {
    _id: "1",
    name: "Premium Writing Paper",
    category: "paper",
    imageUrl: "/images/product-1.svg",
    shortDesc: "High-quality writing paper for professional use",
    longDesc: "Our premium writing paper is manufactured using the finest raw materials and advanced processing techniques. Perfect for corporate communications, official documents, and high-end printing applications.",
    specs: [
      "80-120 GSM weight options",
      "A4, A3, and custom sizes available",
      "Excellent ink absorption",
      "Acid-free composition",
      "ISO 9001 certified quality"
    ],
    featured: true
  },
  {
    _id: "2",
    name: "Newsprint Paper",
    category: "paper",
    imageUrl: "/images/product-2.svg",
    shortDesc: "Lightweight paper perfect for newspapers",
    longDesc: "Specially designed newsprint paper that offers excellent printability at competitive prices. Ideal for newspapers, magazines, and mass printing applications.",
    specs: [
      "45-48.8 GSM weight",
      "High opacity for minimal show-through",
      "Good ink absorption",
      "Cost-effective solution",
      "Bulk quantities available"
    ]
  },
  {
    _id: "3",
    name: "Packaging Paper",
    category: "paper",
    imageUrl: "/images/product-3.svg",
    shortDesc: "Durable paper for packaging solutions",
    longDesc: "Robust packaging paper designed for various packaging applications. Offers excellent strength, durability, and moisture resistance.",
    specs: [
      "100-250 GSM weight range",
      "Food-grade options available",
      "Moisture resistant coating",
      "High tensile strength",
      "Recyclable and eco-friendly"
    ]
  },
  {
    _id: "4",
    name: "Art Paper",
    category: "paper",
    imageUrl: "/images/product-4.svg",
    shortDesc: "Smooth finish paper for printing applications",
    longDesc: "Premium art paper with superior coating for high-quality printing and graphic applications. Perfect for brochures, catalogs, magazines, and artistic prints.",
    specs: [
      "128-300 GSM weight options",
      "Gloss and matte finish available",
      "Excellent color reproduction",
      "Smooth surface texture",
      "Ideal for offset and digital printing"
    ],
    featured: true
  },
  {
    _id: "5",
    name: "Cardboard",
    category: "paper",
    imageUrl: "/images/product-5.svg",
    shortDesc: "Strong cardboard for heavy-duty packaging",
    longDesc: "Heavy-duty cardboard manufactured for packaging and structural applications. Provides excellent strength-to-weight ratio and can be customized for specific requirements.",
    specs: [
      "300-800 GSM weight range",
      "Single and double wall options",
      "Custom die-cutting available",
      "Water-resistant treatments",
      "Recyclable material"
    ]
  },
  // Sugar Products
  {
    _id: "6",
    name: "Bio Ethanol Fuel",
    category: "sugar",
    imageUrl: "/images/product-6.svg",
    shortDesc: "Eco-friendly biofuel from sugar processing",
    longDesc: "High-quality bio ethanol fuel produced as a byproduct of our sugar manufacturing process. This renewable fuel source helps reduce carbon emissions and supports sustainable energy initiatives.",
    specs: [
      "99.5% purity level",
      "Renewable energy source",
      "Low carbon footprint",
      "Industrial grade quality",
      "Bulk supply capabilities"
    ],
    featured: true
  },
  {
    _id: "7",
    name: "Bagasse",
    category: "sugar",
    imageUrl: "/images/product-7.svg",
    shortDesc: "Sustainable byproduct for various applications",
    longDesc: "Bagasse is the fibrous matter that remains after sugarcane crushing. This sustainable byproduct is used in paper manufacturing, building materials, and as a renewable energy source.",
    specs: [
      "High fiber content",
      "Moisture content < 50%",
      "Suitable for pulp production",
      "Biomass fuel applications",
      "Sustainable and renewable"
    ]
  },
  {
    _id: "8",
    name: "Organic Fertilizer",
    category: "sugar",
    imageUrl: "/images/product-8.svg",
    shortDesc: "Natural fertilizer from sugar industry waste",
    longDesc: "Premium organic fertilizer produced from sugar industry byproducts and waste materials. Rich in essential nutrients, this eco-friendly fertilizer improves soil health and crop yields.",
    specs: [
      "NPK balanced formulation",
      "Organic matter > 40%",
      "Slow-release nutrients",
      "Improves soil structure",
      "Environmentally safe"
    ]
  }
];

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = { isActive: true };
    
    if (category) {
      filter.category = category.toLowerCase();
    }
    
    if (featured === 'true') {
      filter.featured = true;
    }
    
    const products = await Product.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .select('-__v');
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products, returning default data:', error.message);
    
    // Filter default products based on query
    let filteredProducts = defaultProducts;
    
    if (req.query.category) {
      filteredProducts = filteredProducts.filter(p => p.category === req.query.category.toLowerCase());
    }
    
    if (req.query.featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured);
    }
    
    res.json(filteredProducts);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).select('-__v');
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product, returning default data:', error.message);
    
    // Find product in default data
    const product = defaultProducts.find(p => p._id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  }
});

module.exports = router;