const errorResponseBody = {
  err:{},
  data:{},
  message:"Something went wrong , cannot process the request",
  success:false
}

const successResponseBody = {
  err:{},
  data:{},
  message:"Successfully processed the req",
  success:true
}


module.exports = {
  successResponseBody,
  errorResponseBody
}