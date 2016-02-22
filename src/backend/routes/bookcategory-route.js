/**
 * Created by irfan.maulana on 12/27/2015.
 */
var express = require('express');
var BookCategoryModel = require('../model/bookcategory-model');

var router = express.Router();

// Find All Book Categories
router.get('/', function (req, res){
    return BookCategoryModel.find(function (err, bookCategories) {
        if (!err) {
            return res.send({result : true, totalCount : bookCategories.length, bookCategories : bookCategories});
        } else {
            console.error(err);
            return res.send({result : false, errorDesc : "Failed when get data from storage, check connection !!!"});
        }
    });
});

// Find Book Category By Id
router.get('/:id', function (req, res){
    return BookCategoryModel.findById(req.params.id, function (err, bookCategory) {
        if (!err) {
            console.info('Get bookCategory '+ req.params.id);
            return res.send({result : true, bookCategory : bookCategory});
        } else {
            console.error(err);
            return res.send({result : false, errorDesc : 'Error when get bookCategory '+ req.params.id});
        }
    });
});

// Insert new data
router.post('/', function (req, res){
    var bookCategory;
    var errorMessage = "";
    if(typeof req !== 'undefined'){
        if(req.body.categoryName === null || req.body.categoryName === ""){
            errorMessage = "Failed getting parameter name.";
            return res.send({result : false, errorDesc : errorMessage});
        }else{
            bookCategory = new BookCategoryModel({
                categoryName: req.body.categoryName,
                description: req.body.description
            });

            bookCategory.save(function (err) {
                if (!err) {
                    console.info("BookCategory : " + bookCategory.categoryName + " has been created.");
                    return res.send({result : true, bookCategory : bookCategory});
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
        return BookCategoryModel.findById(req.params.id, function (err, bookCategory) {
            if (!err) {
                if(req.body.categoryName !== null && req.body.categoryName !== ""){
                    bookCategory.categoryName = req.body.categoryName;
                    bookCategory.description = req.body.description;
                    return userType.save(function (err) {
                        if (!err) {
                            console.info("BookCategory "+ req.params.id+ " has been updated.");
                            return res.send({result : true, bookCategory : bookCategory});
                        } else {
                            console.error(err);
                            return res.send({result : false, errorDesc : 'Error when update bookCategory '+ req.params.id});
                        }
                    });
                }else{
                    console.error('Failed getting parameter name.');
                    return res.send({result : false, errorDesc : 'Failed getting parameter name.'});
                }
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : 'Error when get bookCategory '+ req.params.id});
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
        return BookCategoryModel.findById(req.params.id, function (err, bookCategory) {
            if (!err) {
                return bookCategory.remove(function (err) {
                    if (!err) {
                        console.info("BookCategory "+ req.params.id +" has been removed !");
                        return res.send({result : true, message : 'bookCategory '+ req.params.id +' has been removed.'});
                    } else {
                        console.error(err);
                        return res.send({result : false, errorDesc : 'Error when remove bookCategory '+ req.params.id});
                    }
                });
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : 'Error when get bookCategory '+ req.params.id});
            }
        });
    }else{
        console.error('Failed getting parameter id.');
        return res.send({result : false, errorDesc : 'Failed getting parameter id.'});
    }
});


module.exports = router;