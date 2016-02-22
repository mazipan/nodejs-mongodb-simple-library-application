/**
 * Created by irfan.maulana on 12/27/2015.
 */

var mongoose = require('../connection/connection');

var Schema = mongoose.Schema;
var BookCategory = new Schema({
    categoryName : { type: String, required: true, unique : true },
    description : { type: String},
    modified : { type: Date, default: Date.now }
});
var BookCategoryModel = mongoose.model('BookCategory', BookCategory);

module.exports = BookCategoryModel;