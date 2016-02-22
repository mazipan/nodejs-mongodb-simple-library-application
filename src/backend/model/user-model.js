/**
 * Created by irfan.maulana on 12/27/2015.
 */

var mongoose = require('../connection/connection');

var Schema = mongoose.Schema;
var User = new Schema({
    username : { type: String, required: true, unique : true },
    password : { type: String, required: true },
    userType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType'
    },
    trueName : { type: String},
    email : { type: String},
    created : { type: Date},
    modified : { type: Date, default: Date.now }
});
var UserModel = mongoose.model('User', User);

module.exports = UserModel;