const Theatre = require("../models/theatre.model");

/**
 * 
 * @param {*} data - object containing the details of the theatre to be created
 * @returns - object with the new theatres detail 
 */

const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
  return response;
  } catch (error) {
    if(error.name== "ValidationError")
    {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return {err:err , code:422};
    }
    console.log(err);
    throw err;
  }
}



/**
 * 
 * @param {*} id  - the unique id using which we can identify the theatre to be deleted 
 * @returns - the deleted theatre object
 */
const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if(!response){
      return{
       err : "No record of the theatre found for the given id",
      code : 404
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


//id = theatre id
/**
 * 
 * @param {*} id - unique id based on which we will fetch a theatre
 * @returns 
 */

const getTheatre = async (id) => {
  try {
     const response = await Theatre.findById(id);
    if(!response){
      //no record found for the id
      return {
        err : "No theatre found for the given id",
        code : 404
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
 * @returns data - the data is going to be the data used to filter out theatres based on city / pincode 
 * returns an object with the filtered content of theatres
 */
// const getAllTheatres = async () => {
//   try {
//     const response = await Theatre.find({})
//     return response;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
const getAllTheatres = async(data) => {
  try {
    let query = {};
    let pagination = {};


    if(data && data.city) {
      //check whether city is present in query param
      query.city= data.city;
    }
     if(data && data.pincode){
      //whether pin code is present in query param
      query.pincode = data.pincode;
    }
    if(data && data.name){
      //checks whther name is present in qeury params
      query.name = data.name;
    }
    if(data && data.limit){
      pagination.limit = data.limit
    }
    if(data && data.skip)
      { 
        let perPage = (data.limit) ? data.limit : 3;
        pagination.skip = data.skip * perPage;
       
      }
    
    const response = await Theatre.find(query , {} , pagination);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}




/**
 * id - unique id to indentiyf the theatre to be updates
 * data - data to be used to update teh theatre 
 * return - it returns the new updated theatre object 
 */















/**
 * 
 * @param {*} theatreId - unique id of the theatre for which we want to update movies
 * @param {*} movieIds - array of movie ids that is expexted ot be update in theatre
 * @param {*} insert - boolean that tell whther we want to insert movies or remove them 
 * @returns - updates theatre object
 */

const updateMoviesInTheatres = async (theatreId , movieIds , insert) => {
  const theatre = await Theatre.findById(theatreId);
  if(!theatre)
  {
    return {
      err : " No such theatre found for the id provided",
      code : 404
    };
  }
   if(insert){
    //we need to add movies
    movieIds.forEach(movieId => {
      theatre.movies.push(movieId);
    })
   }
   else{
   // we need to remove movies
   //we are going to loop each movie id that was provided in movieid and for each movieid will check if its there in theatre movie id 
   let savedMovieIds = theatre.movies;
   movieIds.forEach(movieId => {
    //filter keep those in the array for which condition meets 
    savedMovieIds = savedMovieIds.filter(smi => smi != movieId);
   })
   theatre.movies = savedMovieIds;
   }

   //.save is very imp as it will do the changes in the db
   await theatre.save();

   //.populate will use movies array to find corresponding id and will show in theatre object
   return theatre.populate('movies');
}

module.exports = {
createTheatre,
deleteTheatre,
getTheatre,
getAllTheatres,
updateMoviesInTheatres
}