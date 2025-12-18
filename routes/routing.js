// import express
const express = require('express')
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

// create Router object
const router = new express.Router()

// define path for client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login', userController.loginController)
// googlelogin
router.post('/google/sign-in', userController.googleLoginController)
// get home books
router.get('/books/home', bookController.getHomePageBooksController)

// -----------------------------authorised user ----------------------------------

// add book - formdata
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

// get all books page
router.get('/books/all',jwtMiddleware,bookController.getUserAllBookPageController)

// get all user upload books page
router.get('/user-books/all',jwtMiddleware,bookController.getUserUploadBookProfilePageController)
 
module.exports = router
