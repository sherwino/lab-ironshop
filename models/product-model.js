const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Review = require('./review-model.js');//importing the review-model so that I could use it as an array / subDocument of the  product

const productSchema = new Schema ({
  name: {
    type: String,
    //this is a validation, and you could give it an error message
    required: [true, "Please enter the product name"]
  },
  price: {
    type: Number,
    required: [true, "Yo, enter a price please....thank you"]
    },
  imageUrl: {
    type: String,
    default: '/images/box.gif'
  },
  description: { 
    type: String,
    required: [true, 'Please describe the product so that people know what it is.']
  },
  //       http  :ecample.pizza /blah.gif
  // match: /^https?:\/\/\w+\.\w+(\/\w+)*\/\w+\.\w+$/ ,
  reviews: [ Review.schema ], //you are pulling the whole review-model.js schema, you have to import it before you could use this.
  category: {
    type: String,
    enum: ['Games', 'Music', 'Movies', 'Books', 'Cookware', 'Entertainment']
  }
});

//First argument is the name of the model, and figure out the name of the collection
//so the code is going to be create a collection called products
//the second is the variable to define the fields that the documents/products are going to have.
//you could also have all of the verifications in the schema, to do test... like all ages should be an integer.
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
