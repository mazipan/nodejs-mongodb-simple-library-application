/**
 * Created by irfan.maulana on 12/27/2015.
 */

var mongoose = require('../connection/connection');

var Schema = mongoose.Schema;
var UserType = new Schema({
    typeName : { type: String, required: true, unique : true },
    description : { type: String},
    modified : { type: Date, default: Date.now }
});
var UserTypeModel = mongoose.model('UserType', UserType);

module.exports = UserTypeModel;