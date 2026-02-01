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
const getAllTheatres = async () => {
  try {
    const response = await Theatre.find({})
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

module.exports = {
createTheatre,
deleteTheatre,
getTheatre,
getAllTheatres
}