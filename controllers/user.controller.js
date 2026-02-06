const userService = require("../services/user.service");
const {errorResponseBody , successResponseBody} = require("../utils/responsebody")
const {STATUS_CODES} = require("../utils/constraints")

const update = async (req , res) => {
  try {
    const response = await userService.updateUserRoleOrStatus(req.body , req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the user";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.err = error;
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}

module.exports = {
  update
}