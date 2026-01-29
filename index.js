const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');


const MovieRoutes = require('./routes/movie.routes')

env.config();
const app = express();   //express object

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

MovieRoutes(app); // invoking movie routes

app.get('/home' , (req,res)=>{
  console.log("hitting /home")
  return res.json({
    success:true
  })
})

app.listen(process.env.PORT , async ()=>{
  //this callback gets executed , once we successfully start the server on the given port
  console.log(`Server started on Port ${process.env.PORT}`);

  try{
 await mongoose.connect(process.env.DB_URL);
  console.log("successfully connected to mongo");
//   await Movie.create({
//     name:"b p",
//     description : "com mas",
//     casts: ["ak g" , "k s"],
// director : "f s",
// trailerUrl: "http://",
// language:"hindi",
// releaseDate:"18-03-2022",
// releaseStatus:"RELEASED"
//   });
  }
  catch(err)
  {
    console.log("not bale to connect mongo" , err);
  }

})