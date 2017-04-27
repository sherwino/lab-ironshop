const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema ({
  name: { type: String, },
  price: { type: Number, default: 0 },
  imageUrl: { type: String, default: '/images/box.gif' },
  description: { type: String, default: 'product' }

});

//First argument is the name of the model, and figure out the name of the collection
//so the code is going to be create a collection called products
//the second is the variable to define the fields that the documents/products are going to have.
//you could also have all of the verifications in the schema, to do test... like all ages should be an integer.
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
