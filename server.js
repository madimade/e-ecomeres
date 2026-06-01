const express = require('express'); 
const cors = require('cors'); 
const path = require('path'); 
const app = express(); 
 
app.use(cors()); 
app.use(express.json()); 
app.use(express.static(path.join(__dirname, './')));  
   
const products = [ 
    { id: 1, name: 'Classic White T-Shirt', price: 29.99, category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1583531434835-a89cd594fab3?q=80&w=400' }, 
    { id: 2, name: 'Denim Jacket', price: 89.99, category: 'Jackets', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=400' }, 
    { id: 3, name: 'Elegant Evening Dress', price: 129.99, category: 'Dresses', image: 'https://images.unsplash.com/photo-1765229276796-c93c73cc3f3b?q=80&w=400' }, 
    { id: 4, name: 'Fashion Sneakers', price: 79.99, category: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400' } 
]; 

// جلب المنتجات
app.get('/api/products', (req, res) => res.json(products)); 

// استقبال رسائل الاتصال
app.post('/api/contact', (req, res) => { 
    console.log("رسالة جديدة من:", req.body.email); 
    console.log("محتوى الرسالة:", req.body);
    res.json({ success: true }); 
}); 

app.listen(3000, () => console.log('Server running on http://localhost:3000'));