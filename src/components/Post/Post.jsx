import React,{useState} from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import {useSelector} from 'react-redux'
import ProfileImage from "../../img/defaultProfile.png";


const Post = ({data}) => {
const [status,setStatus]=useState({data})
const user = useSelector((state)=>state.user.value)
const likePost = (id)=>{

  fetch('http://localhost:5000/like',{
  method:'put',
  headers:{
    "Content-Type":"application/json",
    "Authorization": "Bearer "+localStorage.getItem('jwt')
  },
  body:JSON.stringify({postId:id})
  }).then(res=>res.json())
  
  .catch(err=>{console.log(err)})
  
}
const unLikePost = (id)=>{
  fetch('http://localhost:5000/unlike',{
  method:'put',
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+localStorage.getItem('jwt')
  },
  body:JSON.stringify({postId:id})
  }).then(res=>res.json())
  
 .catch(err=>{console.log(err)})
}
const makeComment = (text,id)=>{
  fetch('http://localhost:5000/comment',{
  method:'put',
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+localStorage.getItem('jwt')
  },
  body:JSON.stringify({postId:id,text})
  }).then(res=>res.json())
  
 .catch(err=>{console.log(err)})
}

  return (
    <div className="Post">
        <div className="detail">
            <img src={data?.postedBy?.profilePic? data.postedBy.profilePic:ProfileImage} alt="" />
            <span className='user'><b>{data.postedBy.firstname} {data.postedBy.lastname}</b></span>
        </div>
        <div> {data.title}</div>
        <img src={data.img} alt=""  layout='fill'/>


        <div className="postReact" >
            <img
            style={{cursor:'pointer'}}
            onClick={()=>{data.likes.includes(user._id)? unLikePost(data._id):likePost(data._id)}}
            onDoubleClick={()=>{unLikePost(data._id)}}
            src={data.likes.includes(user._id)? Heart: NotLike} alt="" />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{data.likes.length} likes</span>

        <div className="Detail">
            {data.comments.map((comment)=>{
            return(
            <div key={comment._id} >
            <span ><b>#{comment.postedBy.firstname} {comment.postedBy.lastname}</b></span>
            <span> {comment.text}</span>
            </div>
            )
            })}
              </div>
            <form onSubmit={(e)=>{e.preventDefault()
            makeComment(e.target[0].value,data._id)}}>
 <div className="PostShare">
      <div>
        <input type="text" placeholder="add a comment" 
        
        />
        </div>
        </div>
            </form>
      
    </div>
  )
}

export default Post