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
    description: req.body.productDescription
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

//product-details?id=17878787
//going to use a variable in the url instead
// productRoutes.get('/product-details', (req, res, next) => {
//these are URL parameters instead of QUERY which would be req.query.id
// send will just display the result in the browser on it's own
//but we are going to use that we are going to use the render
//and the findById method is a mongoose method that will let you iterate
// in the DB and find the products by their id...
// in this case the id is automatically assigned by mongoDB
// then this will grab the productID that is gathered from the URL
// rem the req.query will create a key value pair in the url

productRoutes.get('/products/:id', (req, res, next) => {
 const productId = req.params.id;


 Product.findById(productId, (err, theProduct) => {
   if (err) {
     next(err);
     return;
   }
   // 404 if no product was found
   if (!theProduct) {
     next();
     return;
   }
   res.render('products/product-details-view.ejs', {
     product: theProduct
   });
 });
});
//                  /products/444/edit (example of how the URL is going to look)
productRoutes.get('/products/:id/edit', (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId, (err, theProduct) => {
    if (err) {
      next(err);
      return;
    }
  res.render('products/edit-product-view.ejs', {
    product: theProduct
  });
});
});
//                      remeber :id is just a placeholder
//                      it could be whatever you want
productRoutes.post('/products/:id/', (req, res, next) => {
  const productID = req.params.id;

  const productChanges = {
    name:         req.body.productName,
    price:        req.body.productPrice,
    imageUrl:     req.body.productImageUrl,
    description:  req.body.productDescription
  };
//this new method has three arguments
  Product.findByIdAndUpdate(
    productID,                  //which document to change
    productChanges,             //variable of the changes you want to make
    (err, theProduct) => {      //the callback
      if (err) {
        next(err);
        return;
      }                        //end of error callback
                              //this is how you would redired to prodcut details page
                              // res.redirect(`/products/${productId}`);

    res.redirect('/products');
    }
  );
});


module.exports = productRoutes;
