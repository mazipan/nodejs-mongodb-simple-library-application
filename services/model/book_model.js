/**
 * Created by irfan.maulana on 12/27/2015.
 */

var mongoose = require('../connection/connection');

var Schema = mongoose.Schema;
var Book = new Schema({
    bookCode : { type: String, required: true, unique : true }, // ISBN
    bookTitle : { type: String, required: true},
    bookAuthor : { type: String},
    bookYearPublished : { type: Date},
    bookImageUrl : { type: String},
    bookLanguage : { type: String},
    bookDescription : { type: String},
    bookSynopsis : { type: String},
    bookCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookCategory'
    },
    created : { type: Date},
    modified : { type: Date, default: Date.now }
});
var BookModel = mongoose.model('Book', Book);

module.exports = BookModel;