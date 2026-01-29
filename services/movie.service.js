const Movie = require('../models/movie.model');

const createMovie = async(data) => {
  const movie = await Movie.create(data);
  return movie;
}


const deleteMovie = async (id) => {
  const response = await Movie.findByIdAndDelete(id);
  return response;
}

const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
 // console.log(movie);
  if(!movie)
  {
    return {
    err : "No movie found for the correponding id provided",
    code : 404,
    
    }
  };
  return movie;
}

module.exports = {
  getMovieById,
  createMovie,
  deleteMovie
}