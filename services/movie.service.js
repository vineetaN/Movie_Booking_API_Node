
const Movie = require('../models/movie.model');

const getMovieById = async (id) => {
  const movie = Movie.findById(id);
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
  getMovieById
}