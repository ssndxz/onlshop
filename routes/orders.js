const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/', auth, async (req, res) => {
  const { products } = req.body;
  try {
    let total = 0;
    const orderItems = [];
    for (const item of products) {
      const product = await Product.findOne({ name: item.name });
      if (!product) {
        return res.status(404).json({ msg: `Product "${item.name}" not found` });
      }
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
      total += product.price * item.quantity;
    }
    const newOrder = new Order({
      user: req.user.id,
      products: orderItems,
      total
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;