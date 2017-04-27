const express = require('express');

const Product = require('../models/product-model.js');

const productRoutes = express.Router();

productRoutes.get('/products', (req, res, next) => {
  Product.find((err, productList) => {
      if (err) {
        next(err);
        return;
      }

    res.render('products/products-list-view.ejs', {
      products: productList
    });
});
});

productRoutes.get('/products/new', (req, res, next) => {
  res.render('products/new-product-view.ejs');
});

productRoutes.post('/products/new', (req, res, next) => {
  const theProduct = new Product({
    //this value comes from the input form that is being posted...to the body
    name: req.body.productName,
    price: req.body.productPrice,
    imageUrl: req.body.productImageUrl,
    description: req.body.productDescrption
  });
  theProduct.save((err) => {
    if (err) {
      next(err);
      return;
    }
              //localhost:3000/products
    res.redirect('/products');
  });
});

productRoutes.get('/product-details', (req, res, next) => {

});

module.exports = productRoutes;
