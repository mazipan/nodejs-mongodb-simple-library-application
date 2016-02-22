/**
 * Created by irfan.maulana on 12/27/2015.
 */
var express = require('express');
var BookModel = require('../model/book-model');
var BookCategoryModel = require('../model/bookcategory-model');

var router = express.Router();

// Find All Books
router.get('/', function (req, res){
    return BookModel.find({})
        .populate('bookCategory')
        .exec(function(err, books) {
            if (!err) {
                return res.send({result : true, totalCount : books.length, books : books});
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : "Failed when get data from storage, check connection !!!"});
            }
        });
});

// Find Book By Id
router.get('/:id', function (req, res){
    return BookModel.findById(req.params.id)
        .populate('bookCategory')
        .exec(function (err, book) {
            if (!err) {
                console.info('Get book '+ req.params.id);
                return res.send({result : true, book : book});
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : 'Error when get book '+ req.params.id});
            }
        });
});

// Insert new data
router.post('/:bookCategoryId', function (req, res){
    var book;
    var errorMessage = "";
    if(typeof req !== 'undefined'){
        return BookCategoryModel.findById(req.params.bookCategoryId, function (err, bookCategory) {
            if (!err) {
                book = new BookModel({
                    bookCode : req.body.bookCode,
                    bookTitle : req.body.bookTitle,
                    bookAuthor : req.body.bookAuthor,
                    bookYearPublished : req.body.bookYearPublished,
                    bookImageUrl : req.body.bookImageUrl,
                    bookLanguage : req.body.bookLanguage,
                    bookDescription : req.body.bookDescription,
                    bookSynopsis : req.body.bookSynopsis,
                    bookCategory: bookCategory._id,
                    stock: 1,
                    created : Date.now()
                });

                return book.save(function (err) {
                    if (!err) {
                        console.info("Book : " + book.bookTitle + " has been created.");

                        var jsonResult = {
                            bookCode : book.bookCode,
                            bookTitle : book.bookTitle,
                            bookAuthor : book.bookAuthor,
                            bookYearPublished : book.bookYearPublished,
                            bookImageUrl : book.bookImageUrl,
                            bookLanguage : book.bookLanguage,
                            bookDescription : book.bookDescription,
                            bookSynopsis : book.bookSynopsis,
                            bookCategory: bookCategory,
                            stock: book.stock,
                            created : book.created,
                            modified : book.modified
                        };

                        return res.send({result : true, book : jsonResult});
                    } else {
                        console.error(err);
                        return res.send({result : false, errorDesc : err});
                    }
                });
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : 'Error when get bookCategory '+ req.params.bookCategoryId});
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
        return BookModel.findById(req.params.id)
            .populate('bookCategory')
            .exec(function (err, book) {
                if (!err) {
                    var bookCategory = book.bookCategory;

                    book.bookCode = req.body.bookCode,
                    book.bookTitle = req.body.bookTitle,
                    book.bookAuthor = req.body.bookAuthor,
                    book.bookYearPublished = req.body.bookYearPublished,
                    book.bookImageUrl = req.body.bookImageUrl,
                    book.bookLanguage = req.body.bookLanguage,
                    book.bookDescription = req.body.bookDescription,
                    book.bookSynopsis = req.body.bookSynopsis,
                    book.stock = req.body.stock,
                    book.bookCategory = bookCategory._id;

                    return book.save(function (err) {
                        if (!err) {
                            console.info("Book : "+ req.params.id + " has been updated.");

                            var jsonResult = {
                                bookCode : book.bookCode,
                                bookTitle : book.bookTitle,
                                bookAuthor : book.bookAuthor,
                                bookYearPublished : book.bookYearPublished,
                                bookImageUrl : book.bookImageUrl,
                                bookLanguage : book.bookLanguage,
                                bookDescription : book.bookDescription,
                                bookSynopsis : book.bookSynopsis,
                                bookCategory: bookCategory,
                                stock: book.stock,
                                created : book.created,
                                modified : book.modified
                            };

                            return res.send({result : true, book : jsonResult});
                        } else {
                            console.error(err);
                            return res.send({result : false, errorDesc : err});
                        }
                    });
                } else {
                    console.error(err);
                    return res.send({result : false, errorDesc : 'Error when get book '+ req.params.id});
                }
            });
    }else{
        console.error('Failed getting parameter id.');
        return res.send({result : false, errorDesc : 'Failed getting parameter id.'});
    }
});


// Update data stock by Id
router.put('/updateStock/:id', function (req, res){
    if(typeof req.params.id !== "undefined" && req.params.id !== null){
        return BookModel.findById(req.params.id)
            .populate('bookCategory')
            .exec(function (err, book) {
                if (!err) {
                    var bookCategory = book.bookCategory;
                    book.stock = req.body.stock;

                    return book.save(function (err) {
                        if (!err) {
                            console.info("Book  "+ req.params.id + " stock has been updated "+ book.stock +".");

                            var jsonResult = {
                                bookCode : book.bookCode,
                                bookTitle : book.bookTitle,
                                bookAuthor : book.bookAuthor,
                                bookYearPublished : book.bookYearPublished,
                                bookImageUrl : book.bookImageUrl,
                                bookLanguage : book.bookLanguage,
                                bookDescription : book.bookDescription,
                                bookSynopsis : book.bookSynopsis,
                                bookCategory: bookCategory,
                                stock: book.stock,
                                created : book.created,
                                modified : book.modified
                            };

                            return res.send({result : true, book : jsonResult});
                        } else {
                            console.error(err);
                            return res.send({result : false, errorDesc : err});
                        }
                    });
                } else {
                    console.error(err);
                    return res.send({result : false, errorDesc : 'Error when get book '+ req.params.id});
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
        return BookModel.findById(req.params.id, function (err, book) {
            if (!err) {
                return book.remove(function (err) {
                    if (!err) {
                        console.info("Book "+ req.params.id +" has been removed !");
                        return res.send({result : true, message : 'Book '+ req.params.id +' has been removed.'});
                    } else {
                        console.error(err);
                        return res.send({result : false, errorDesc : 'Error when remove user '+ req.params.id});
                    }
                });
            } else {
                console.error(err);
                return res.send({result : false, errorDesc : 'Error when get book '+ req.params.id});
            }
        });
    }else{
        console.error('Failed getting parameter id.');
        return res.send({result : false, errorDesc : 'Failed getting parameter id.'});
    }
});

module.exports = router;