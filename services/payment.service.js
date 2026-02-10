const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const { STATUS_CODES , BOOKING_STATUS, PAYMENT_STATUS, USER_ROLE} = require("../utils/constraints");
const User = require("../models/user.model")
const Show = require("../models/show.model")


const createPayment = async (data) => {
  try {
    
    const booking = await Booking.findById(data.bookingId);
    
     const show = await Show.findOne({
      movieId : booking.movieId , 
      theatreId : booking.theatreId,
      timing : booking.timings
    });
   
    if(booking.status == BOOKING_STATUS.successfull)
    {
      throw {
        err: "Booking laready done , cannot make a new payment agaiinst it",
        code : STATUS_CODES.FORBIDDED
      }
    }
    if(!booking)
    {
      throw {
        err : "No booking found",
        code : STATUS_CODES.NOT_FOUND
      }
    }

    let bookingTime = booking.createdAt;
    let currentTime = Date.now();

    //calculate how many minutes are remaining
    let minutes = Math.floor(((currentTime - bookingTime)/1000/60))
    if(minutes > 5)
    {
      booking.status = BOOKING_STATUS.expired;
      await booking.save();
      
      return booking;
    }


    //hardocde

    const payment = await Payment.create({
      booking: data.bookingId ,
      amount : data.amount
    });

   if(payment.amount != booking.totalCost)
   {
    payment.status = PAYMENT_STATUS.failed
    await payment.save();
   }


    if(!payment || payment.status == PAYMENT_STATUS.failed)
    {
      booking.status = BOOKING_STATUS.cancelled;
      await booking.save();
      await payment.save();
      return booking;
    }
    payment.status = PAYMENT_STATUS.success;
    booking.status = BOOKING_STATUS.successfull;
    show.noOfSeats -= booking.noOfSeats;

    await show.save();
    await booking.save();
    await payment.save();
    
    return booking;




  } catch (error) {
    console.log(error);
    throw error;
  }
}


const getPaymentId = async (id) => {
  try {
    const response = await Payment.findById(id).populate("booking");
    if(!response)
    {
      throw {
        err : "No payment record found",
        code : STATUS_CODES.NOT_FOUND
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
}


const getAllPayments = async (userId) => {
  try {
    const user = await User.findById(userId);

    let filter = {};
    if(user.userRole != USER_ROLE.admin)
    {
      filter.userId = user.id;
    }

    const bookings = await Booking.find(filter , 'id')
    const payments = await Payment.find({booking : {$in : bookings}});
    
    return payments;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPayment,
  getPaymentId , 
  getAllPayments
}