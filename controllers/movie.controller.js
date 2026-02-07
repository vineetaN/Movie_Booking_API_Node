const Movie = require('../models/movie.model');
const movieService = require("../services/movie.service");
const {errorResponseBody , successResponseBody} = require('../utils/responsebody');
const {STATUS_CODES} = require("../utils/constraints");


//controller function to create a new movie




const createMovie = async (req , res) => {
   try{
   const response = await movieService.createMovie(req.body);
   
  successResponseBody.data= response;
  successResponseBody.message = "Successfully created the movie"
    return res.status(STATUS_CODES.CREATED).json(successResponseBody)
   } catch(error)
   {
   if(error.err)
    {
      errorResponseBody.err= error.err;
      return res.status(error.code).json(errorResponseBody);
    } 
console.log(err);
errorResponseBody.err = error;
return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
   }
}


const deleteMovie = async (req , res) => {
  try {
    const response = await movieService.deleteMovie(req.params.id);
   


    successResponseBody.data= response;
    successResponseBody.message = "Successfully deleted the movie"
    return res.status(STATUS_CODES.OK).json(successResponseBody)
  } catch (error) {
    if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
   errorResponseBody.err = error;
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}


const getMovie = async (req,res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);
   if(response.err)
   {
    errorResponseBody.err = response.err;
    return res.status(response.code).json(errorResponseBody);
   }

   successResponseBody.data = response;

    return res.status(200).json(successResponseBody);

  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponseBody);
  }
}



const updateMovie = async (req , res) => {
  try {
    const response = await movieService.updateMovie(req.params.id , req.body);
    if(response.err){
      errorResponseBody.err = response.err;
      errorResponseBody.message = "The updates that we are trying to apply doesn't validates the schema."
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    errorResponseBody.err = err;
    return res.status(500).json(errorResponseBody);
  }
}


const getMovies = async (req , res) => {
  try {
  const response = await movieService.fetchMovies(req.query)
  if(response.err){
    errorResponseBody.err = response.err;
    return res.status(response.code).json(errorResponseBody);

  }

  successResponseBody.data = response;
  return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody)
  }
}


module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
  getMovies
}