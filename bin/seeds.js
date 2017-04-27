const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ironshopDB');

const Product = require('../models/product-model.js');


const products = [
  {
    name: 'Yoga Mat',
    price: 29.99,
    imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
    description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
    name: '20" monitor',
    price: 249.99,
    imageUrl: 'http://i.dell.com/das/xa.ashx/global-site-design%20WEB/ef3e2d15-c3bb-cd7d-ba10-c05f26138e96/1/OriginalPng?id=Dell/Product_Images/Peripherals/Output_Devices/Dell/Monitors/U_Series/U2417HA/hero/dell-monitor-u2417ha-right-hero-504x350.jpg',
    description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
    name: 'Nintendo Switch',
    price: 299.99,
    imageUrl: 'http://www.nintendo.com/switch/etRgxnAu0zRX4bmWnt9K628wG7YQUI6t/images/switch/home/video-thumb-6.jpg',
    description: 'Play Zelda the way it was meant to be played',
  },
{
  name: 'Fender Stratocaster',
  price: 999.99,
  imageUrl: 'http://www.fmicassets.com/Damroot/Lg/10001/9216112576_gtr_frt_001_rr.png',
  description: 'Play Guitar the way it was meant to be played',
}
];


//this is the same thing as doing db.products.inserMany()
Product.create(products, (err, productDocs) => {
  if (err) {
    throw err;
  }
  productDocs.forEach((oneProduct) => {
    console.log(`NEW PRODUCT ${oneProduct.name } -> ${oneProduct._id}`);
  });
});
