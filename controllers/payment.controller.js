const paymentService = require("../services/payment.service");
const { BOOKING_STATUS, STATUS_CODES } = require("../utils/constraints");
const {errorResponseBody, successResponseBody} = require("../utils/responsebody")

const create = async (req , res) => {
  try {
    console.log("req body is here")
    console.log(req.body);
    const response =await paymentService.createPayment(req.body);
   // console.log(response);
    if(response.status == BOOKING_STATUS.expired)
    {
      errorResponseBody.err = "The payment took more than 5 minutes to process , hence your booking got expired , please try again later"
      errorResponseBody.data = response;
      return res.status(STATUS_CODES.GONE).json(errorResponseBody)
    }

    if(response.status == BOOKING_STATUS.cancelled)
    {
      
      errorResponseBody.err = "The payment failed due to some reason , booking was not successful ..please try again later"
      errorResponseBody.data = response;
      return res.status(STATUS_CODES.PAYMENT_REQUIRED).json (errorResponseBody)
    }
    successResponseBody.data = response;
    successResponseBody.message = "Booking completed successfully";
    
    return res.status(STATUS_CODES.OK).json(successResponseBody)
  } catch (error) {
    
    if(error.err)
    {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.err = error.err;
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}


const getPaymentDetailsById = async (req,res) => {
  try {
    const response = await paymentService.getPaymentId(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fethced the booking and payment details";
    return res.status(STATUS_CODES.OK).json(successResponseBody)
  } catch (error) {
    if(error.err)
    {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.err = error;
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}


const getAllPayments = async (req , res) => {
  try {
    const response = await paymentService.getAllPayments(req.user)
    
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched all the payments";
    return res.status(STATUS_CODES.OK).json(successResponseBody)
  } catch (error) {
    errorResponseBody.err = error;
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}

module.exports = {
  create ,
  getPaymentDetailsById , 
  getAllPayments
}