const mongoose =require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema =new mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  firstname:{
    type:String,
    required:true,
  },
  lastname:{
    type:String,
    required:true,
  },
  password:{
   type:String,
    required:true,
  },
  workAt:String,
  livesIn:String,
  status:String,
  country:String,
  profilePic:String,
  coverPic:String,
  followrs:[{
        type:ObjectId,
        ref:"User",
        }],
  following:[{
        type:ObjectId,
        ref:"User",
        }],
},
 {
    timestamps:true
    });

mongoose.model('User',userSchema)