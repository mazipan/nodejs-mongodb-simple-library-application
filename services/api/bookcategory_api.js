/**
 * Created by irfan.maulana on 12/27/2015.
 */
var express = require('express');
var UserTypeModel = require('../model/usertype_model');

var router = express.Router();

// Find All User Types
router.get('/', function (req, res){
    return UserTypeModel.find(function (err, userTypes) {
        if (!err) {
            return res.send({result : true, totalCount : userTypes.length, userTypes : userTypes});
        } else {
            console.error(err);
            return res.send({result : false, errorDesc : "Failed when get data from storage, check connection !!!"});
        }
    });
});

// Find User Type By Id
router.get('/:id', function (req, res){
    return UserTypeModel.findById(req.params.id, function (err, userType) {
        if (!err) {
            console.info('Get userType '+ req.params.id);
            return res.send({result : true, userType : userType});
        } else {
            console.error(err);
            return res.send({result : false, errorDesc : 'Error when get userType '+ req.params.id});
        }
    });
});

// Insert new data
router.post('/', function (req, res){
    var userType;
    var errorMessage = "";
    if(typeof req !== 'undefined'){
        if(req.body.typeName === null || req.body.typeName === ""){
            errorMessage = "Failed getting parameter name.";
            return res.send({result : false, errorDesc : errorMessage});
        }else{
            userType = new UserTypeModel({
                typeName: req.body.typeName,
                description: req.body.description
            });

            userType.save(function (err) {
                if (!err) {
                    console.info("UserType : "+userType.typeName + " has been created.");
                    return res.send({result : true, userType : userType});
                } else {
                    console.error(err);
                    return res.send({result : false, errorDesc : err});
                }
            });

        }
    }else{
        errorMessage = "Request is null or empty.";
        return res.send({result : false, errorDesc : errorMessage});
    }
});

// Update data by Id
router.put('/:id', function (req, res){
    if(typeof req.params.id !== "undefined" && req.params.id !== null){
        return UserTypeModel.findById(req.params.id, function (err, userType) {
            if(req.body.typeName !== null && req.body.typeName !== ""){
                userType.typeName = req.body.typeName;
                userType.description = req.body.description;
                return userType.save(function (err) {
                    if (!err) {
                        console.info("UserType "+ req.params.id+ " has been updated.");
                        return res.send({result : true, userType : userType});
                    } else {
                        console.error(err);
                        return res.send({result : false, errorDesc : 'Error when update userType '+ req.params.id});
                    }
                });
            }else{
                console.error('Failed getting parameter name.');
                return res.send({result : false, errorDesc : 'Failed getting parameter name.'});
            }
        });
    }else{
        console.error('Failed getting parameter id.');
        return res.send({result : false, errorDesc : 'Failed getting parameter id.'});
    }
});

// Delete data by Id
router.delete('/:id', function (req, res){
    if(typeof req.params.id !== "undefined" && req.params.id !== null){
        return UserTypeModel.findById(req.params.id, function (err, userType) {
            return userType.remove(function (err) {
                if (!err) {
                    console.info("UserType "+ req.params.id +" has been removed !");
                    return res.send({result : true, message : 'UserType '+ req.params.id +' has been removed.'});
                } else {
                    console.error(err);
                    return res.send({result : false, errorDesc : 'Error when remove userType '+ req.params.id});
                }
            });
        });
    }else{
        console.error('Failed getting parameter id.');
        return res.send({result : false, errorDesc : 'Failed getting parameter id.'});
    }
});


module.exports = router;