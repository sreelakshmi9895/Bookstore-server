const books = require('../models/bookModel')

// add book
exports.addBookController = async(req,res)=>{
    console.log("Inside addBookController");
// get book details from req body
const {title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category} = req.body

const uploadImages = req.files.map(item=>item.filename)

const sellerMail = req.payload

console.log(title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail);

try{
   // check book already exist
   const existingBook = await books.findOne({title,sellerMail})
  if(existingBook){
   res.status(401).json("Upload book is already exists.....Request Failed!!!")
  }else{
   const newBook = await books.create({title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail})

   res.status(200).json(newBook)
}

}catch(error){
   console.log(error);
   res.status(500).json(error)
}

}

// get home books
exports.getHomePageBooksController = async (req,res)=>{
   console.log("Inside getHomePageBooksController");
   try{
      // get newly added 4 books from db
      const homeBooks = await books.find().sort({_id:-1}).limit(4)
      res.status(200).json(homeBooks)
   }catch(error){
      console.log(error);
      res.status(500).json(error)
   }
}

// get all books-user
exports.getUserAllBookPageController = async (req,res)=>{
   console.log("Inside getUserAllBookPageController");
   // get query from req
   const searchKey = req.query.search
   console.log(searchKey);
   
   // get login user mail from token
   const loginUserMail = req.payload
   try{
      // get all books from db except loggedin User
      const allBooks = await books.find({sellerMail:{$ne:loginUserMail},title:{$regex:searchKey,$options:'i'}})
      res.status(200).json(allBooks)
   }catch(error){
      console.log(error);
      res.status(500).json(error)
   }
}
// get all user uploaded books

exports.getUserUploadBookProfilePageController = async (req,res)=>{
   console.log("Inside getUserUploadBookProfilePageController ");
   // get login user mail from token
   const loginUserMail = req.payload
   try{
      // get all books from db except loggedin User
      const allUserBooks = await books.find({sellerMail:loginUserMail})
      res.status(200).json(allUserBooks)
   }catch(error){
      console.log(error);
      res.status(500).json(error)
   }
}

// get all user bought books
exports.getUserBoughtBookProfilePageController = async (req,res)=>{
   console.log("Inside getUserBoughtBookProfilePageController ");
   // get login user mail from token
   const loginUserMail = req.payload
   try{
      // get all books from db except loggedin User
      const allUserPurchaseBooks = await books.find({buyerMail:loginUserMail})
      res.status(200).json(allUserPurchaseBooks)
   }catch(error){
      console.log(error);
      res.status(500).json(error)
   }
}

// get single book
exports.viewBookController = async (req, res) => {
   console.log("Inside viewBookController")
   // get if from req
   const { id } = req.params
   // grt book details of given if from db
   try {
      const bookDetails = await books.findById({_id:id})
      res.status(200).json(bookDetails)
     }catch (error) {
      console.log(error)
      res.status(500).json(error)
   }
}

// get all books-admin
exports.getAllBooksController = async (req,res)=>{
   console.log("Inside getAllBooksController");
   try{
      // get all books from db
      const allBooks = await books.find()
      res.status(200).json(allBooks)
   }catch(error){
      console.log(error);
      res.status(500).json(error)
   }
}

//update book status-admin :login user
exports.updateBookStatusController = async (req,res)=>{
   console.log("Inside updateBookStatusController");
   // get _id of book
   const {id} = req.params
    try{
      // get all books from db
      const bookDetails = await books.findById({_id:id})
      bookDetails.status = "approved"
      // save changes to mongodb
      await bookDetails.save()
      res.status(200).json(bookDetails)
   }catch(error){
      console.log(error);
      res.status(500).json(error)
   }
}

// delete user book - user
exports.deleteBookController = async (req,res)=>{
   console.log("Inside deleteBookController");
   // get _id of book
   const {id} = req.params
    try{
      // get all books from db
      const bookDetails = await books.findByIdAndDelete({_id:id})
      res.status(200).json(bookDetails)
   }catch(error){
      console.log(error);
      res.status(500).json(error)
   }
}