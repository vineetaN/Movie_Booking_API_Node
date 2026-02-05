const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');


const MovieRoutes = require('./routes/movie.routes')
const theatreRoutes = require("./routes/theatre.routes");
const authRoutes = require("./routes/auth.routes");

env.config();
const app = express();   //express object

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

MovieRoutes(app); // invoking movie routes
theatreRoutes(app) //invoking theatre routes
authRoutes(app); //invoking auth routes


app.listen(process.env.PORT , async ()=>{
  //this callback gets executed , once we successfully start the server on the given port
  console.log(`Server started on Port ${process.env.PORT}`);

  try{
 await mongoose.connect(process.env.DB_URL);
  console.log("successfully connected to mongo");

  }
  catch(err)
  {
    console.log("not bale to connect mongo" , err);
  }
})