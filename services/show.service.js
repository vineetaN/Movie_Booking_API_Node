const Show = require("../models/show.model")
const { STATUS_CODES } = require("../utils/constraints")
const Theatre = require("../models/theatre.model")


/**
 * 
 * @param {*} data -> object containing details of the show to be created
 * @returns - object with the new show details
 */
const createShow = async (data) => {
  try {
    const theatre = await Theatre.findById(data.theatreId);
    if(!theatre)
    {
      throw {
        err : "No theatre found",
        code : STATUS_CODES.NOT_FOUND
      }
    }

    if(theatre.movies.indexOf(data.movieId) == -1)
    {
      throw {
        err : "Movie is currently not available in the requested theatre",
        code : STATUS_CODES.NOT_FOUND
      }
    }

    const response = await Show.create(data);
    return response;
  } catch (error) {
    if(error.name == "ValidationError"){
      let err = {};
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message;
      });
      throw {
        err  ,
        code : STATUS_CODES.UNPROCESSABLE_ENTITY
      }
    }
    throw error;
  }
}


const getShows = async (data) => {
  try {
    let filter = {};
    if(data.theatreId)
    {
      filter.theatreId = data.theatreId
    }
    if(data.movieId)
    {
      filter.movieId = data.movieId
    }
    const response = await Show.find(filter);
    if(!response)
    {
      throw {
        err : " No shows found",
        code : STATUS_CODES.NOT_FOUND
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createShow,
  getShows
}