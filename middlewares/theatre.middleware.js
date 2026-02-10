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
    errorResponseBody.err = "The name of the theatre is not present in the request sent"
    return res.status(400).json(errorResponseBody)
  }

    if(!req.body.pincode)
  {
    errorResponseBody.err = "The PINCODE of the theatre is not present in the request sent"
    return res.status(400).json(errorResponseBody)
  }


    if(!req.body.city)
  {
    errorResponseBody.err = "The city of the theatre is not present in the request sent"
    return res.status(400).json(errorResponseBody)
  }

  next(); //everything is fine 

}



const validateUpdateMoviesRequest = async(req , res,  next) => {

  //validation of that insert parameter - bool true or false
  if(req.body.insert==undefined){
    errorResponseBody.err = "The insert parameter is missing"
    return res.status(400).json(errorResponseBody)
  }

  //validate moviedId presents
  if(!req.body.movieIds){
    errorResponseBody.err = "No movies present in the request to be updated in theatre"
    return res.status(400).json(errorResponseBody);
  }

  //validate if movieid is array or not
  if(!(req.body.movieIds instanceof Array)){
    errorResponseBody.err = "Expected array of movies but found something else";
    return res.status(400).json(errorResponseBody)
  }

  //validate if movieId is empty or not
  if(req.body.movieIds.length ==0)
  {
    errorResponseBody.err = "No movies present in the array provided";
    return res.status(400).json(errorResponseBody)
  }
//everything is fine
  next();
}

module.exports = {
validateTheatreCreateRequest,
validateUpdateMoviesRequest
}