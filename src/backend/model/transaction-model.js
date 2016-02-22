/**
 * Created by irfan.maulana on 01/01/2016.
 */

var mongoose = require('../connection/connection');

var Schema = mongoose.Schema;
var Transaction = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    flagIsBack : { type: Number, default: 0},
    mustReturnDate : { type: Date},
    returnDate : { type: Date},
    created : { type: Date},
    modified : { type: Date, default: Date.now }
});
var TransactionModel = mongoose.model('Transaction', Transaction);

module.exports = TransactionModel;