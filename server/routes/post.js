const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireSignin = require('../middleware/requireSignin')
const Post = mongoose.model('Post')



router.get('/allpost',requireSignin,(req,res)=>{
   Post.find().sort({createdAt : -1})
   .populate("postedBy","_id firstname lastname profilePic")
   .then(posts=>res.json({posts}))     
  
   .catch(err=>console.log(err))
})

router.post('/createpost',requireSignin,(req,res)=>{
   const {img,title} = req.body
   if(!img || !title){
      return res.status(422).json({error:"You must add one of the fileds"})
   }
   req.user.password = undefined
   const post = new Post({
      title,
      img,
      postedBy:req.user
   })
   post.save().then(result=>{
      res.json({post:result})
   })
   .catch(err=>{
      console.log(err)
   })
})

router.get('/mypost',requireSignin,(req,res)=>{
   Post.find({postedBy:req.user._id}).sort({createdAt : -1})
   .populate("postedBy","_id firstname lastname profilePic")
   .then(mypost=>{
      res.json({mypost})
   })
   .catch(err=>{
      console.log(err)
   })
})

router.put('/like',requireSignin,async(req,res)=>{
  
   const post= await Post.findById(req.body.postId)
   if(!post.likes.includes(req.user._id))
   {
   await post.updateOne(
   {$push:{likes:req.user._id}},{new:true
   }).then(result=> {return res.json(result)})
   .catch(err=>{
      console.log(err)
   })
   }
    
})

router.put('/unlike',requireSignin,(req,res)=>{
   Post.findByIdAndUpdate(req.body.postId,{
   $pull:{likes:req.user._id}},{new:true
   }).exec((err,result)=>{
     if(err){
       return res.status(422).json({error:err})
     }else{
       return res.json(result)
     }
   })

})

router.put('/comment',requireSignin,(req,res)=>{
   req.user.password = undefined
   const comment={text:req.body.text,postedBy:req.user}
   Post.findByIdAndUpdate(req.body.postId,{
   $push:{comments:comment}},{new:true
   })
   .populate("comments.postedBy","firstname lastname")
   .then(result=>{ return res.json(result)})
    .catch(err=>{
      console.log(err)
   })

})

module.exports = router