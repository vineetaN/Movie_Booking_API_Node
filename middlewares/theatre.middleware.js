const {errorResponseBody} = require("../utils/responsebody")



/**
 * 
 * @param {*} req - HTTP req obje
 * @param {*} res - HTTP response obje
 * @param {*} next - next middleware function 
 * @returns - whether the request is valid or not 
 */


const validateTheatreCreateRequest = async (req , res , next) => {

  if(!req.body.name)
  {
    errorResponseBody.message = "The name of the theatre is not present in the request sent"
    return res.status(400).json(errorResponseBody)
  }

    if(!req.body.pincode)
  {
    errorResponseBody.message = "The PINCODE of the theatre is not present in the request sent"
    return res.status(400).json(errorResponseBody)
  }


    if(!req.body.city)
  {
    errorResponseBody.message = "The city of the theatre is not present in the request sent"
    return res.status(400).json(errorResponseBody)
  }

  next(); //everything is fine 

}

module.exports = {
validateTheatreCreateRequest
}