const movieController = require('../controllers/movie.controller')
const MovieMiddlewares = require("../middlewares/movie.middlewares")
const authMiddlewares = require("../middlewares/auth.middlewares")

const routes = (app) => {
  //routes function take express app object as parameter

  //create
  app.post('/mba/api/v1/movies' ,
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    MovieMiddlewares.validateMovieCreateReques ,  movieController.createMovie);

  //delete
  app.delete('/mba/api/v1/movies/:id',
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.deleteMovie
  )

  app.get('/mba/api/v1/movies/:id',
    movieController.getMovie
  )


  //read
  app.put('/mba/api/v1/movies/:id',
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.updateMovie
  );


  //update
  app.patch(
    '/mba/api/v1/movies/:id',
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.updateMovie
  );

  app.get(
     '/mba/api/v1/movies/',
    movieController.getMovies
  );
}

module.exports = routes;