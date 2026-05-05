// backend/server.js - Complete Ecommerce API
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (will work even if MongoDB is not running)
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_store')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('⚠️ MongoDB not running, using mock data'));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number
});

const Product = mongoose.model('Product', productSchema);

// Mock Products (in case MongoDB is not running)
const mockProducts = [
  { 
    id: "1", 
    name: "Galaxy Wireless Headphones", 
    description: "Premium noise-cancelling headphones with 40-hour battery life.", 
    price: 129.99, 
    category: "Electronics", 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", 
    stock: 25, 
    rating: 4.8 
  },
  { 
    id: "2", 
    name: "Fusion Smart Watch", 
    description: "Track fitness, heart rate, and sleep. Built-in GPS.", 
    price: 199.99, 
    category: "Wearables", 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", 
    stock: 15, 
    rating: 4.6 
  },
  { 
    id: "3", 
    name: "Urban Laptop Backpack", 
    description: "Water-resistant backpack with USB charging port.", 
    price: 59.99, 
    category: "Accessories", 
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", 
    stock: 40, 
    rating: 4.7 
  },
  { 
    id: "4", 
    name: "Phantom Mechanical Keyboard", 
    description: "RGB backlit mechanical keyboard with customizable keys.", 
    price: 89.99, 
    category: "Electronics", 
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", 
    stock: 20, 
    rating: 4.9 
  },
  { 
    id: "5", 
    name: "Lumina Desk Lamp", 
    description: "Smart LED lamp with adjustable brightness.", 
    price: 45.99, 
    category: "Lighting", 
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", 
    stock: 35, 
    rating: 4.5 
  },
  { 
    id: "6", 
    name: "Premium Yoga Mat", 
    description: "Eco-friendly non-slip yoga mat with carrying strap.", 
    price: 34.99, 
    category: "Sports", 
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400", 
    stock: 50, 
    rating: 4.4 
  },
  { 
    id: "7", 
    name: "Elite Coffee Maker", 
    description: "Programmable coffee maker with thermal carafe.", 
    price: 79.99, 
    category: "Home & Kitchen", 
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400", 
    stock: 12, 
    rating: 4.7 
  },
  { 
    id: "8", 
    name: "Titan Fitness Band", 
    description: "Waterproof fitness tracker with heart rate monitoring.", 
    price: 69.99, 
    category: "Wearables", 
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400", 
    stock: 30, 
    rating: 4.3 
  }
];

// ============= API ROUTES =============

// Home route
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Ecommerce API is running!',
    endpoints: {
      products: 'GET /api/products',
      productById: 'GET /api/products/:id',
      search: 'GET /api/search/:query',
      category: 'GET /api/category/:category',
      seed: 'GET /api/seed'
    }
  });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.json({ success: true, count: products.length, products });
    } else {
      res.json({ success: true, count: mockProducts.length, products: mockProducts });
    }
  } catch (error) {
    res.json({ success: true, count: mockProducts.length, products: mockProducts });
  }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json({ success: true, product });
    }
  } catch (error) {}
  
  const mockProduct = mockProducts.find(p => p.id === req.params.id);
  if (mockProduct) {
    res.json({ success: true, product: mockProduct });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

// Search products
app.get('/api/search/:query', async (req, res) => {
  const searchTerm = req.params.query.toLowerCase();
  try {
    const dbProducts = await Product.find();
    const filtered = dbProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
    if (filtered.length > 0) {
      return res.json({ success: true, count: filtered.length, products: filtered });
    }
  } catch (error) {}
  
  const filtered = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.category.toLowerCase().includes(searchTerm)
  );
  res.json({ success: true, count: filtered.length, products: filtered });
});

// Filter by category
app.get('/api/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    if (products.length > 0) {
      return res.json({ success: true, count: products.length, products });
    }
  } catch (error) {}
  
  const filtered = mockProducts.filter(p => p.category === category);
  res.json({ success: true, count: filtered.length, products: filtered });
});

// Seed database (add mock products to MongoDB)
app.get('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const inserted = await Product.insertMany(mockProducts);
    res.json({ success: true, message: `${inserted.length} products added to database!` });
  } catch (error) {
    res.json({ success: false, message: 'MongoDB not running. Using mock data only.', products: mockProducts });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 ${mockProducts.length} products available`);
  console.log(`\n📍 Test these URLs:`);
  console.log(`   - All products: http://localhost:${PORT}/api/products`);
  console.log(`   - Single product: http://localhost:${PORT}/api/products/1`);
  console.log(`   - Search: http://localhost:${PORT}/api/search/headphones`);
  console.log(`   - Category: http://localhost:${PORT}/api/category/Electronics`);
  console.log(`   - Seed DB: http://localhost:${PORT}/api/seed\n`);
});