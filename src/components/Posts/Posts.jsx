import React ,{useEffect,useState}from 'react'
import './Posts.css'

import Post from '../Post/Post'

const Posts = () => {
const [PostsData,setPostsData]=useState([])
useEffect(()=>{
   fetch('http://localhost:5000/allpost',{
   headers:{
     "Authorization":"Bearer "+localStorage.getItem('jwt')
   }
   }).then(res=>res.json())
   .then(result=>{
     //console.log(result)
     setPostsData(result.posts)
   })
},[PostsData])
  return (
    <div className="Posts">
        {PostsData.map((post, id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts