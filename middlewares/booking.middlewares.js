const {STATUS_CODES , USER_ROLE , BOOKING_STATUS} = require("../utils/constraints")
const{successResponseBody, errorResponseBody} = require("../utils/responsebody")
const ObjectId = require("mongoose").Types.ObjectId
const theatreService = require("../services/theatre.service")
const userService = require("../services/user.service")


const validateBookingCreateRequest = async (req , res , next) => {
  if(!req.body.theatreId){
    errorResponseBody.err = "No theatre id provided"
    return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
  }

  //validate correct theatreid
  if(!ObjectId.isValid(req.body.theatreId))
  {
    errorResponseBody.err = "Invalid theatreid provided"
return res.status(STATUS_CODES.BAD_REQUEST.json(errorResponseBody))
  }

  //check if theatre exsit in db
  const theatre = await theatreService.getTheatre(req.body.theatreId);
  if(!theatre){
    errorResponseBody.err = "No theatre found for the given id";
    return res.status(STATUS_CODES.NOT_FOUND).json(errorResponseBody)
  }

  //validate movie presence
  if(!req.body.movieId){
    errorResponseBody.err = "No movie id present";
    return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
  }


  //validate correct mvoie id format
  if(!ObjectId.isValid(req.body.movieId)){
    errorResponseBody.err = "Invalid movie id format";
    return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
  }


  //validate if movie is running in theatre or not 
  if(theatre.movies.indexOf(req.body.movieId) == -1){
    errorResponseBody.err = "Given movie is not availble in the requested theatre";
    return res.status(STATUS_CODES.NOT_FOUND).json(errorResponseBody);
  }

  //validate presence of timings
 if(!req.body.timings)
 {
  errorResponseBody.err = "No movie timing passed";
  return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
 }

 if(!req.body.noOfSeats){
  errorResponseBody.err = "No seat provided";
  return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
 }

console.log("H")
next();

}

//if normal customer is doing naything arapt from cancellation . they should not be allowed to do that
const canChangeStatus = async (req,res,next) => {
       const user = await userService.getUserById(req.user);
       if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled)
       {
        errorResponseBody.err = "You are not allowed to change the booking status"
        return res.status(STATUS_CODES.UNAUTHORISED).json(errorResponseBody)
       }
       next();

}

module.exports = {
validateBookingCreateRequest ,
canChangeStatus
}