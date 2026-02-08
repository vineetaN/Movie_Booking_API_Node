const Booking = require("../models/booking.model");
const {STATUS_CODES} = require("../utils/constraints")


const createBooking = async(data) => {
  try {
    const response = await Booking.create(data);
    return response;
  } catch (error) {
    console.log(error);
    if(error.name == "ValidationError"){
      let err= {};
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message;
      });
  throw { err : err , code : STATUS_CODES.UNPROCESSABLE_ENTITY}
    }
    
    throw error;
  }
}


const updateBooking = async (data , bookingId) => {
  try {
    const response = await Booking.findByIdAndUpdate(bookingId , data , {
      new:true, runValidators:true
    });
    if(!response)
    {
      throw {
        err : "No booking found for the given id",
        code : STATUS_CODES.NOT_FOUND
      }
    }
    return response
  } catch (error) {
    if(error.name == "ValidationError"){
      let err = {};
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message;
      });
      throw {err:err , code:STATUS_CODES.UNPROCESSABLE_ENTITY}
    }
    console.log(error);
    throw error;
  }
}

const getBookings = async (data) => {
  try {
    const response = await Booking.find(data)
    return response
  } catch (error) {
    throw error;
  }
}

const getAllBookings = async () => {
  try {
    const response = await Booking.find();
    return response;
  } catch (error) {
    throw error;
  }
}

const getBookingById = async (id , userId) => {
  try {
    const response = await Booking.findById(id);
    if(!response){
      throw {
        err : "No booking record found for the id" ,
        code : STATUS_CODES.NOT_FOUND
      }
    }
    if(response.userId != userId){
      throw {
        err: "Not able to access the booking",
        code :STATUS_CODES.UNAUTHORISED
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createBooking , 
  updateBooking,
  getAllBookings,
  getBookings,
  getBookingById
}
