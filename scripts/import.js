const axios = require('axios');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const connectDB = require('../config/db');
const Product = require('../models/Product');

const importProducts = async () => {
  try {
    await connectDB();
    const { data: products } = await axios.get('https://fakestoreapi.com/products');
    console.log(`Found ${products.length} products.`);
    for (const item of products) {
      const existing = await Product.findOne({ name: item.title });
      if (existing) {
        console.log(`Product "${item.title}" already exists.`);
        continue;
      }
      const newProduct = new Product({
        name: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        stock: Math.floor(Math.random() * 100) + 1,
        image: item.image 
      });
      await newProduct.save();
      console.log(`Imported product: ${item.title}`);
    }
  } catch (err) {
    console.error('Error importing products:', err.message);
  } finally {
    setTimeout(() => mongoose.connection.close(), 3000);
  }
};

importProducts();