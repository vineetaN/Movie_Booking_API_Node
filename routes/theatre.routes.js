const theatreController= require("../controllers/theatre.controller");
const theatreMiddleware = require("../middlewares/theatre.middleware")
const authMiddleware = require("../middlewares/auth.middlewares")

const routes = (app) => {
  //routes function take express app object as parameter

  //create
  app.post(
    '/mba/api/v1/theatres', 
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.create
  );
  
  //delete
  app.delete(
    '/mba/api/v1/theatres/:id',
    authMiddleware.isAuthenticated,
    theatreController.destroy
  )
 

  //read
  app.get(
    '/mba/api/v1/theatres/:id',
    theatreController.getTheatre
  );

//READ - for query params also we dont need different routes , due to excess amount of combination that can occur from query parameters - we can not define so many routes . so the query params are considered differently and route will be same
  app.get(
    '/mba/api/v1/theatres',
    theatreController.getTheatres
  );



//update
app.patch(
  "/mba/api/v1/theatres/:id",
  theatreController.update
)

//update
app.put(
  "/mba/api/v1/theatres/:id",
  theatreController.update
)


app.get(
  '/mba/api/v1/theatres/:id/movies',
  theatreController.getMovies
)


  app.patch(
    '/mba/api/v1/theatres/:id/movies',
    theatreMiddleware.validateUpdateMoviesRequest,
    theatreController.updateMovies
  )

  app.get(
    '/mba/api/v1/theatres/:theatreId/movies/:movieId',
    theatreController.checkMovie
  )
}

module.exports = routes;