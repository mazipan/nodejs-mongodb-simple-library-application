/**
 * Created by irfan.maulana on 12/27/2015.
 */
var express = require('express');
var UserModel = require('../model/user-model');
var UserTypeModel = require('../model/usertype-model');
var crypto = require('crypto');

var router = express.Router();

function hashMD5(stringWillEncode){
    var hash = crypto.createHash('md5').update(stringWillEncode).digest('hex');
    return hash;
};

// Find All Users
router.get('/', function (req, res){
    return UserModel.find({})
        .populate('userType')
        .exec(function(err, users) {
            if (!err) {
                return res.send({result : true, totalCount : users.length, users : users});
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : "Failed when get data from storage, check connection !!!"});
            }
        });
});

// Find User By Id
router.get('/:id', function (req, res){
    return UserModel.findById(req.params.id)
            .populate('userType')
            .exec(function (err, user) {
                if (!err) {
                    console.info('Get user '+ req.params.id);
                    return res.send({result : true, user : user});
                } else {
                    console.error(err);
                    return res.send({result : false, errorDesc : 'Error when get user '+ req.params.id});
                }
            });
});

// Login with username & password
router.post('/login', function (req, res){
    var errorMessage = "";
    if(typeof req !== 'undefined'){
        if(req.body.username !== null && req.body.username !== "" &&
            req.body.password !== null && req.body.password !== ""){

            return UserModel.findOne({
                'username': req.body.username,
                'password': req.body.password
            })
            .populate('userType')
            .exec(function (err, user) {
                if (!err && user !== null) {
                    console.info('User success login ==> '+ req.body.username);
                    return res.send({result : true, user : user});
                } else {
                    console.error(err);
                    return res.send({result : false, errorDesc : 'Error when login '+ req.params.id});
                }
            });
        }else{
            errorMessage = "Failed getting parameter username or password.";
            return res.send({result : false, errorDesc : errorMessage});
        }
    }else{
        errorMessage = "Request is null or empty.";
        return res.send({result : false, errorDesc : errorMessage});
    }
});

// Insert new data
router.post('/:userTypeId', function (req, res){
    var user;
    var errorMessage = "";
    if(typeof req !== 'undefined'){
        return UserTypeModel.findById(req.params.userTypeId, function (err, userType) {
            if (!err) {
                user = new UserModel({
                    username : req.body.username,
                    password : hashMD5(req.body.password),
                    userType: userType._id,
                    trueName : req.body.trueName,
                    email : req.body.email,
                    created : Date.now()
                });

                return user.save(function (err) {
                    if (!err) {
                        console.info("User : "+user.username + " has been created.");

                        var jsonResult = {
                            username : user.username,
                            password : user.password,
                            userType: userType,
                            trueName : user.trueName,
                            email : user.email,
                            created : user.created,
                            modified : user.modified
                        };

                        return res.send({result : true, user : jsonResult});
                    } else {
                        console.error(err);
                        return res.send({result : false, errorDesc : err});
                    }
                });
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : 'Error when get userType '+ req.params.userTypeId});
            }
        });
    }else{
        errorMessage = "Request is null or empty.";
        return res.send({result : false, errorDesc : errorMessage});
    }
});

// Update data by Id
router.put('/:id', function (req, res){
    if(typeof req.params.id !== "undefined" && req.params.id !== null){
        return UserModel.findById(req.params.id)
            .populate('userType')
            .exec(function (err, user) {
                if (!err) {
                    var userType = user.userType;

                    user.username = req.body.username,
                    user.password = hashMD5(req.body.password),
                    user.userType = req.body.userType,
                    user.trueName = req.body.trueName,
                    user.email = req.body.email;

                    return user.save(function (err) {
                        if (!err) {
                            console.info("User : "+ req.params.id + " has been updated.");

                            var jsonResult = {
                                username : user.username,
                                password : user.password,
                                userType: userType,
                                trueName : user.trueName,
                                email : user.email,
                                created : user.created,
                                modified : user.modified
                            };

                            return res.send({result : true, user : jsonResult});
                        } else {
                            console.error(err);
                            return res.send({result : false, errorDesc : err});
                        }
                    });
                } else {
                    console.error(err);
                    return res.send({result : false, errorDesc : 'Error when get user '+ req.params.id});
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
        return UserModel.findById(req.params.id, function (err, user) {
            if (!err) {
                return user.remove(function (err) {
                    if (!err) {
                        console.info("User "+ req.params.id +" has been removed !");
                        return res.send({result : true, message : 'User '+ req.params.id +' has been removed.'});
                    } else {
                        console.error(err);
                        return res.send({result : false, errorDesc : 'Error when remove user '+ req.params.id});
                    }
                });
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : 'Error when get user '+ req.params.id});
            }
        });
    }else{
        console.error('Failed getting parameter id.');
        return res.send({result : false, errorDesc : 'Failed getting parameter id.'});
    }
});


module.exports = router;