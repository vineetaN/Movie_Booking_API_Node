const badRequestResponse = {
  success : false,
      err :"",
      data : {},
      message : "Malformed request | bad request"
}

/**
 * 
 * @param {*} req - HTTP req obje
 * @param {*} res - HTTP response obje
 * @param {*} next - next middleware function 
 * @returns - whether the request is valid or not 
 */

const validateMovieCreateReques = async (req , res , next) => {
   //validate the movie name
   if(!req.body.name){
    badRequestResponse.err = "The name of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
   }

   //validate the movie description
   if(!req.body.description) 
   {
    badRequestResponse.err = "The Description of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
   }

   //validate the movie castes 
   if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
    badRequestResponse.err = "The casts of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
   }


   //validate the movie trailerURL
   if(!req.body.trailerUrl)
   {
    badRequestResponse.err = "The trailerUrl of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
   }

   //validate the release date of the movie
 if(!req.body.releaseDate)
   {
    badRequestResponse.err = "The releaseDate of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
   }

   //validate director of the movie
   if(!req.body.director)
   {
    badRequestResponse.err = "The Director of the movie is not present in the request sent";
    return res.status(400).json(badRequestResponse);
   }


   next();
}



module.exports = {
  validateMovieCreateReques
}