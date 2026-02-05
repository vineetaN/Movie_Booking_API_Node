const jwt = require("jsonwebtoken")

const {errorResponseBody} = require('../utils/responsebody');
const userService = require("../services/user.service")
/**
 * 
 * @param {*} req - http req object
 * @param {*} res - http res object
 * @param {*} next - next middleware
 //validator for user signup
 */

const validateSignupRequest = async (req , res , next) => {
  //validate name of the user
  if(!req.body.name){
   errorResponseBody.err = "Name of the user is not present in the request";
   return res.status(400).json(errorResponseBody);
  }

  //validate email of the user
  if(!req.body.email){
    errorResponseBody.err = "Email of the user is not present in the request";
    return res.status(400).json(errorResponseBody)
  }   


  //validate password presence
  if(!req.body.password){
    errorResponseBody.err = " Password of the user is not present in the request";
    return res.status(400).json(errorResponseBody);
  }

//valid request
  next();
}


//validtor for user signin
const validateSigninRequest = async (req , res , next) => {
 //validate user email presence 
 if(!req.body.email)
 {
  errorResponseBody.err = "No email provided for signin"
  return res.status(400).json(errorResponseBody);
 }

 //validate user password presence
 if(!req.body.password)
 {
  errorResponseBody.err = "No password provided for signin"
  return res.status(400).json(errorResponseBody);
 }

 //everything is fine
 next();

}


const isAuthenticated = async(req , res,next) => {
  try {
    const token = req.headers["x-access-token"];
    if(!token){
    errorResponseBody.err = "No token provided";
    return res.status(403).json(errorResponseBody)
    }

    const response = jwt.verify(token , process.env.AUTH_KEY);
    if(!response){
    errorResponseBody.err = "Token not verified"
    return res.status(401).json(errorResponseBody);
  }

  const user = await userService.getUserById(response.id)
  req.user = user.id;
  next();
  } catch (error) {
    if(error.name == "JsonWebTokenError"){
      errorResponseBody.err= error.message;
      return res.status(401).json(errorResponseBody)
    }
    if(error.code == 404){
      errorResponseBody.err = "User doesn't exist"
      return res.status(error.code).json(errorResponseBody)
    }
errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody)
  }
  


}


module.exports = {
validateSignupRequest , 
validateSigninRequest ,
isAuthenticated
}