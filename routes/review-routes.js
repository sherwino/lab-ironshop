const express = require('express');

const Product = require('../models/product-model.js');

const Review = require('../models/review-model.js');

const reviewRoutes = express.Router();


// reviewRoutes.getttttttttttttttttttt iittt
reviewRoutes.get('/products/:productId/reviews/new', (req, res, next) => {
  const myProductId = req.params.productId;

  Product.findById(myProductId, (err, theProduct) =>{
    if (err) {
      next(err);
      return;
    }
  res.render('reviews/new-review-view.ejs', {
    product: theProduct
  });
  });
});

reviewRoutes.post('/products/:productId/reviews', (req, res, next) => {
  const myProductId = req.params.productId;


  Product.findById(myProductId, (err, theProduct) => {
    if (err) {
      next(err);
      return;
    }

    //requires the review model
    const theReview = new Review ({
      content: req.body.reviewContent,
      stars: req.body.reviewStars,
      author: req.body.reviewAuthor
    });

    theProduct.reviews.push(theReview);

    theProduct.save((err) => {
      if (err) {
        res.render('reviews/new-review-view.ejs', {
          product: theProduct,
          validationErrors: theProduct.errors
        });
        return;
      }

      res.redirect(`/products/${myProductId}`);
    });
  });

});


module.exports = reviewRoutes;
