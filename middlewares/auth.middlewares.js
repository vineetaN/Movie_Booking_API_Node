const {errorResponseBody} = require('../utils/responsebody');

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





module.exports = {
validateSignupRequest , 
validateSigninRequest
}