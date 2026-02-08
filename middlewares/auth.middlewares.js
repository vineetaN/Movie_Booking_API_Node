const jwt = require("jsonwebtoken")

const {errorResponseBody} = require('../utils/responsebody');
const userService = require("../services/user.service")
const {USER_ROLE , STATUS_CODES} = require("../utils/constraints")



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
   return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
  }

  //validate email of the user
  if(!req.body.email){
    errorResponseBody.err = "Email of the user is not present in the request";
    return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
  }   


  //validate password presence
  if(!req.body.password){
    errorResponseBody.err = " Password of the user is not present in the request";
    return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
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
  return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
 }

 //validate user password presence
 if(!req.body.password)
 {
  errorResponseBody.err = "No password provided for signin"
  return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
 }

 //everything is fine
 next();

}


const isAuthenticated = async(req , res,next) => {
  try {
    const token = req.headers["x-access-token"];
    if(!token){
    errorResponseBody.err = "No token provided";
    return res.status(STATUS_CODES.FORBIDDED).json(errorResponseBody)
    }

    const response = jwt.verify(token , process.env.AUTH_KEY);
    if(!response){
    errorResponseBody.err = "Token not verified"
    return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody);
  }

  const user = await userService.getUserById(response.id)
  req.user = user.id;
  next();
  } catch (error) {
    if(error.name == "JsonWebTokenError"){
      errorResponseBody.err= error.message;
      return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody)
    }
    if(error.code == STATUS_CODES.NOT_FOUND){
      errorResponseBody.err = "User doesn't exist"
      return res.status(error.code).json(errorResponseBody)
    }
errorResponseBody.err = error;
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
  
}

const validateRestPasswordRequest = (req , res, next) => {
  //validate old password poresent
  if(!req.body.oldPassword){
    errorResponseBody.err = "Missing the old password in the request"
    return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
  }
  //validate new password present
  if(!req.body.newPassword){
    errorResponseBody.err = "Missing the new password in the request";
    return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
   

   
  }
   next();
}

const isAdmin = async (req , res , next) => {
  const user = await userService.getUserById(req.user);
  if(user.userRole != USER_ROLE.admin)
  {
    errorResponseBody.err = "user is not an admin , cannot proceed with the request"
    return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody)
  }
  next();

}

const isClient = async (req,res,next) => {
  const user = await userService.getUserById(req.user);
  if(user.userRole != USER_ROLE.client){
    errorResponseBody.err = "User is not a client , cannot proceed with the request";
    return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody)
  }
  next();
}

const isAdminOrClient = async (req , res, next) => {
  const user = await userService.getUserById(req.user);
  if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client)
  {
    errorResponseBody.err = "User is neither a client nor an admin , cannot proceed with the request"
    return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody)
  }
  next();
}


module.exports = {
validateSignupRequest , 
validateSigninRequest ,
isAuthenticated,
validateRestPasswordRequest,
isAdmin,
isClient,
isAdminOrClient
}