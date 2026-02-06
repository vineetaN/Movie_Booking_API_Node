const mongoose = require('mongoose');

/* defines the schema of the theatre resourse to be stored in the db */

const theatreSchema = new mongoose.Schema({
  name: {
    type : String,
    required:true,
    minLength : 5
  },
  description : String ,
  city : {
    type : String , 
    required: true
  },
  pincode : {
    type : Number,
    required : true
  },
  address : String,
  movies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref : "Movie"
  }
} , {timestamps:true});

const Theatre = mongoose.model('Theatre' , theatreSchema);
module.exports = Theatre;