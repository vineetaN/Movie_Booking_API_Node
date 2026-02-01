const theatreController= require("../controllers/theatre.controller");
const theatreMiddleware = require("../middlewares/theatre.middleware")

const routes = (app) => {
  //routes function take express app object as parameter

  //create
  app.post(
    '/mba/api/v1/theatres', 
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.create
  );
  
  //delete
  app.delete(
    '/mba/api/v1/theatres/:id',
    theatreController.destroy
  )
 

  //read
  app.get(
    '/mba/api/v1/theatres/:id',
    theatreController.getTheatre
  );

//READ
  app.get(
    '/mba/api/v1/theatres',
    theatreController.getTheatres
  );
}

module.exports = routes;