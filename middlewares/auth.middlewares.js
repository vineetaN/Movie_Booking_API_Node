const {errorResponseBody} = require('../utils/responsebody');


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







module.exports = {
validateSignupRequest
}