const users  = require('../models/userModel')
// register api request
exports.registerController = async(req,res)=>{
console.log("Inside registerController");
const {username,email,password}= req.body
console.log(username,email,password);
try{
    //check mail in model
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(409).json("User Already exist!!!Please Login...")
    }else{
        const newUser = new users({
            username,email,password
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
}catch(error){
    console.log(error);
    res.status(500).json(error)
    
}


}
// login
// usereditprofile
// admineditprofile
