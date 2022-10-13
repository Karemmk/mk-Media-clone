const express = require('express')
const router = express.Router()
const mongoose =require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireSignin =require('../middleware/requireSignin')
const Post = mongoose.model('Post')



router.get('/user/:id',requireSignin,(req,res)=>{
  User.findOne({_id:req.params.id})
  .select('-password')
  .then(user=>{
     Post.find({postedBy:req.params.id}).sort({createdAt : -1})
     .populate('postedBy')
     .exec((err,posts)=>{
       if(err){return res.status(422).json({error:err})}
        return res.status(200).json({user,posts})
     })
  }).catch(err=>{return res.status(404).json({err:'user dont exist'})})
})

router.put('/follow',requireSignin,(req,res)=>{
  User.findByIdAndUpdate(req.body.followId,{
  $push:{followrs:req.user._id}
  },{new:true},(err,result)=>{if(err){
  return res.status(422).json({error:err})
  }
  User.findByIdAndUpdate(req.user._id,{
  $push:{following:req.body.followId}},{
new:true
}).then(result=>{
   return res.json(result)
}).catch(err=>{
   return res.status(422).json({error:err})
})
  }
  )
})

router.put('/unfollow',requireSignin,(req,res)=>{
  User.findByIdAndUpdate(req.body.unfollowId,{
  $pull:{followrs:req.user._id}
  },{new:true},(err,result)=>{if(err){
  return res.status(422).json({error:err})
  }
  User.findByIdAndUpdate(req.user._id,{
  $pull:{following:req.body.unfollowId}},{
new:true
}).then(result=>{
   return res.json(result)
}).catch(err=>{
   return res.status(422).json({error:err})
})
  }
  )
})

router.get('/alluser',requireSignin,(req,res)=>{
   User.find().sort({createdAt : -1})
   .select('-password')
   .then(users=>res.json({users}))     
  
   .catch(err=>console.log(err))
})

router.put('/updateinfo',requireSignin,(req,res)=>{
  const id = req.user._id
   
   User.findByIdAndUpdate(id,req.body,{new:true
   })
   .then(result=>{ return res.json(result)})
    .catch(err=>{
       return res.status(422).json({error:err})})

})



router.post('/signup',(req,res)=>{
   const {username,firstname,lastname,password} =req.body 
   if(!lastname || !firstname || !username || !password)
{
    return res.status(422).json({error:"please add all the fields"})
}
User.findOne({username:username})
.then((savedUser)=>
{if(savedUser){
    return res.status(422).json({error:"user already exist with that email"})
}
bcrypt.hash(password,12)
.then(hashedpassword=>{
    const user = new User({
        username,
        firstname,
        lastname,
        password:hashedpassword,
    })
    user.save()
    .then(user=>{
        res.json({message:"save successfully"})
    })
    .catch(err=>{
        console.log(err)
    })
})
})
.catch(err=>{
    console.log(err)
})
}) 

router.post('/signin',(req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        return res.status(422).json({error:"add email or password"})
    }
    User.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
               // return res.json({message:"sign in with success"})
                const token= jwt.sign({_id:savedUser._id},JWT_SECRET)          
                const {_id,firstname,lastname,username,workAt,livesIn,country,status,profilePic,coverPic,followrs,following}=savedUser
                res.json({token,user:{_id,firstname,lastname,username,workAt,livesIn,country,status,profilePic,coverPic,followrs,following}})
            }
            else {
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router;