const jwt = require("jsonwebtoken");


const userService = require("../services/user.service");
const {successResponseBody , errorResponseBody} = require("../utils/responsebody")


const signup = async (req,res) => {
try {
  const response = await userService.createUser(req.body);
  successResponseBody.data = response;
  successResponseBody.message = "Succesfully registered a user";
  return res.status(201).json(successResponseBody);
} catch (error) {
  
  if(error.err){
    errorResponseBody.err = error.err;
    return res.status(error.code).json(errorResponseBody)
  }
  errorResponseBody.err = error;
  return res.status(500).json(errorResponseBody)
}
}


const signin = async(req , res) => {
  try {
    const user = await userService.getUserByemail(req.body.email);
    const isVaildPassword = await user.isVaildPassword(req.body.password);
    if(!isVaildPassword)
    {
      throw {
        err: "Invalid password for the given email", code:401
      };
    }

    const token = jwt.sign({id : user.id , email:user.email} , process.env.AUTH_KEY ,
      {expiresIn : "1h"}
    );

    successResponseBody.message = "Successfully logged in ";
    successResponseBody.data = {
      email : user.email,
      role : user.userRole,
      status: user.userStatus,
      token : token
    };
    return res.status(200).json(successResponseBody)
  } catch (error) {
    if(error.err)
    {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody)
  }
}
module.exports = {
signup,
signin
}