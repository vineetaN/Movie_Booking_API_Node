const Movie = require('../models/movie.model');
const {STATUS_CODES} = require("../utils/constraints")


//parameter - data = object containing details of the new movie to be created.
//return new movie object created
const createMovie = async(data) => {
  try {
    const movie = await Movie.create(data);
  return movie;
  } catch (error) {
    if(error.name=='ValidationError'){
let err = {};
Object.keys(error.errors).forEach((key)=>{
  err[key] = error.errors[key].message;
});
console.log(err);
throw {err :err , code : STATUS_CODES.UNPROCESSABLE_ENTITY};
    }
    else {
    throw error;
    }
  }
  
}


//params - id which will be used to identify the movie to be deleted
//returns - object containing details of the movie deleted
const deleteMovie = async (id) => {
  try {
    const response = await Movie.findByIdAndDelete(id);
    if(!response)
    {
      throw {
        err: " No movie record found for the id provided",
        code : STATUS_CODES.NOT_FOUND
      }
    }

  return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
  
}


/**
 * 
 * @param {*} id - id which will be used to dienityf the movie to be fetched
 * @returns - object containing the movie to be fetched
 */
const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
 // console.log(movie);
  if(!movie)
  {
    throw {
    err : "No movie found for the correponding id provided",
    code : STATUS_CODES.NOT_FOUND,
    
    }
  };
  return movie;
}


/**
 * 
 * @param {*} id - id which will be used to identify the movie to be updated
 * @param {*} data - object that contains the actual data which is to be updated
 * @returns -> returns the new updated movie deails 
 */

const updateMovie = async (id , data) => {

  try {
    const movie = await Movie.findByIdAndUpdate(id , data , {new: true , runValidators: true});
    return movie ;
  } catch (error) {
     if(error.name=='ValidationError'){
let err = {};
Object.keys(error.errors).forEach((key)=>{
  err[key] = error.errors[key].message;
});
console.log(err);
return {err :err , code : 422};
    }
    else {
    throw error;
    }
  }
  
}

/**
 * 
 * @param {*} filter - filter will help us in filtering out the data based on the condition it contains  
 * @returns -> object cotnaining all the movies fetched based on the filtere
 */

const fetchMovies = async (filter) => {
  let query = {};
    if(filter.name){
query.name = filter.name;
    }
    let movies = await Movie.find(query);
    if(!movies)
    {
      throw{
        err : "Not able to find the queries movies",
        code : STATUS_CODES.NOT_FOUND
      }
    }
    return movies;
}

module.exports = {
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
  fetchMovies
}